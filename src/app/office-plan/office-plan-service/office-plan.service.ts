import { HttpClient } from '@angular/common/http';
import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Desk } from 'src/app/interfaces/map';
import { User } from 'src/app/interfaces/user';
import { onOpenSnackBar } from 'src/app/utils';
import { BlockDeskComponent } from '../block-desk/block-desk.component';
import { BookDeskComponent } from '../book-desk/book-desk.component';
import { UnbookDeskComponent } from '../unbook-desk/unbook-desk.component';

@Injectable({
  providedIn: 'root',
})
export class OfficePlanService {
  private messageTooltip = new BehaviorSubject<string>('');
  castMessageTooltip = this.messageTooltip.asObservable();

  constructor(
    private http: HttpClient,
    private signInService: SignInService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  getUserTemplate(user: any) {
    return this.http.get(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${user.id}.json`
    );
  }

  getCurrentDesk(deskId: any, adminId: User) {
    return this.http.get(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${adminId}/desks/${deskId}.json`
    );
  }

  onDrawDesks(resAdmin: any, svgCont: any, desk: Desk) {
    const svgns = 'http://www.w3.org/2000/svg';
    const rect = document.createElementNS(svgns, 'rect');
    if (desk.x && desk.y) {
      rect.setAttribute('x', desk.x);
      rect.setAttribute('y', desk.y);
    } else {
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
    }
    rect.setAttribute('width', desk.width);
    rect.setAttribute('height', desk.height);
    rect.setAttribute('fill', desk.fill);
    rect.setAttribute('id', desk.id);
    rect.setAttribute('cursor', 'pointer');
    if (svgCont && rect) {
      svgCont.append(rect);
    }
    this.addEvenetsOnDesks(resAdmin, rect, desk);
  }

  onDrawAreas(svgCont: any, area: any) {
    const svgns = 'http://www.w3.org/2000/svg';
    const rect = document.createElementNS(svgns, 'rect');
    if (area.x && area.y) {
      rect.setAttribute('x', area.x);
      rect.setAttribute('y', area.y);
    } else {
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
    }
    rect.setAttribute('width', area.width);
    rect.setAttribute('height', area.height);
    rect.setAttribute('fill', area.fill);
    rect.setAttribute('stroke', area.stroke);
    rect.setAttribute('id', area.id);
    if (svgCont && rect) {
      svgCont.append(rect);
    }
  }

  addEvenetsOnDesks(resAdmin: any, rect: any, desk: Desk) {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    const alreadyBooked = resAdmin.desks.find(
      (desk: Desk) => desk.userId === currentUser.id
    );
    rect.addEventListener('click', () => {
      if (!alreadyBooked && desk.status === 'available') {
        this.dialog
          .open(BookDeskComponent, {
            disableClose: true,
            data: {
              currentDesk: desk,
              user: currentUser,
            },
          })
          .afterClosed()
          .subscribe(() => {
            const deskStatus = localStorage.getItem('deskStatus');
            if (deskStatus === 'booked') {
              rect.setAttribute('fill', 'orange');
            }
            if (deskStatus === 'blocked') {
              rect.setAttribute('fill', 'gray');
            }
          });
      }
      if (desk.userId !== currentUser.id && desk.status === 'booked') {
        onOpenSnackBar(
          this.snackBar,
          'You cannot book this desk. It`s already booked'
        );
      }
      if (currentUser.role !== 'admin' && desk.status === 'blocked') {
        onOpenSnackBar(this.snackBar, 'This desk is blocked by your admin.');
      }
      if (
        (desk.userId === currentUser.id && desk.status === 'booked') ||
        (currentUser.role === 'admin' && desk.status === 'blocked')
      ) {
        this.dialog
          .open(UnbookDeskComponent, {
            autoFocus: false,
            disableClose: true,
            data: {
              currentDesk: desk,
              user: currentUser,
            },
          })
          .afterClosed()
          .subscribe(() => {
            rect.setAttribute('fill', 'green');
          });
      }
    });
  }

  onDrawOfficePlan(admin: any, svgCont: any) {
    this.getUserTemplate(admin).subscribe((res: any) => {
      if (res.areas) {
        res.areas.forEach((area: any) => {
          this.onDrawAreas(svgCont, area);
        });
      }
      if (res.desks) {
        res.desks.forEach((desk: any) => {
          this.onDrawDesks(res, svgCont, desk);
        });
      }
    });
  }

  mouseEnterTooltip(renderer: any, desk: any, tooltip: any, message: string) {
    let coordinates = desk.getBoundingClientRect();
    let x = `${coordinates.left + 40}px`;
    let y = `${coordinates.top + 40}px`;
    renderer.setStyle(tooltip.nativeElement, 'left', x);
    renderer.setStyle(tooltip.nativeElement, 'top', y);
    renderer.setStyle(tooltip.nativeElement, 'display', 'block');
    renderer.setProperty(tooltip.nativeElement, 'innerHTML', message);
  }

  mouseLeave(renderer: any, tooltip: any) {
    renderer.setProperty(tooltip.nativeElement, 'innerHTML', '');
    renderer.setStyle(tooltip.nativeElement, 'display', 'none');
  }

  showStatusOfTheDesk(desk: any) {
    let message = '';
    switch (desk.status) {
      case 'available':
        message = 'The desk is available. You can book it by clicking on it.';
        break;
      case 'booked':
        message = `The desk is booked by ${desk.bookedBy}.`;
        break;
      case 'blocked':
        message = `The desk is blocked by your admin.`;
        break;

      default:
        message = 'Test message.';
    }
    return message;
  }

  updateDesk(admin: User, desk: Desk, updatedDesk: Desk) {
    return this.http.put(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${admin.id}/desks/${desk.id}.json`,
      updatedDesk
    );
  }

  changeDeskStatus(data: any, deskStatus: string) {
    this.signInService.getUsers().subscribe((res) => {
      const currentUser = JSON.parse(localStorage.getItem('user')!);
      const admin = res.find(
        (user) =>
          user.role === 'admin' && user.companyName === currentUser.companyName
      );
      if (admin.desks.length > 0) {
        const desk = admin.desks.find((d: Desk) => d.id === data.id);
        const alreadyBooked = admin.desks.find(
          (d: Desk) => d.userId === currentUser.id
        );
        if (
          currentUser.role !== 'admin' &&
          alreadyBooked &&
          alreadyBooked.id !== desk.id
        ) {
          onOpenSnackBar(
            this.snackBar,
            `You've already booked the desk E${desk.id}`
          );
        } else {
          let updatedDesk;

          if (deskStatus === 'available') {
            updatedDesk = {
              ...desk,
              status: deskStatus,
              bookedBy: '',
              userId: '',
              fill: 'green',
            };
          } else if (deskStatus === 'booked') {
            updatedDesk = {
              ...desk,
              status: deskStatus,
              bookedBy: currentUser.firstName,
              userId: currentUser.id,
              fill: 'orange',
            };
          } else if (deskStatus === 'blocked') {
            updatedDesk = {
              ...desk,
              status: deskStatus,
              bookedBy: '',
              userId: '',
              fill: 'gray',
            };
          }
          this.updateDesk(admin, desk, updatedDesk).subscribe();
        }
      }
    });
  }

  adminCanBlockDesk(admin: any) {}
}
