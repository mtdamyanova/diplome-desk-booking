import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Desk } from 'src/app/interfaces/map';
import { User } from 'src/app/interfaces/user';
import { onOpenSnackBar } from 'src/app/utils';
import { url } from 'src/environments/environment';
import { BookDeskComponent } from '../book-desk/book-desk.component';

@Injectable({
  providedIn: 'root',
})
export class OfficePlanService {
  private messageTooltip = new BehaviorSubject<string>('');
  castMessageTooltip = this.messageTooltip.asObservable();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  getUserTemplate(user: any) {
    return this.http.get(`${url}/users/${user.id}.json`);
  }

  getCurrentDesk(deskId: any, adminId: User) {
    return this.http.get(`${url}/users/${adminId}/desks/${deskId}.json`);
  }

  onDrawDesks(svgCont: any, desk: Desk, fillColor: any) {
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
    rect.setAttribute('fill', fillColor);
    rect.setAttribute('id', desk.id);
    rect.setAttribute('cursor', 'pointer');
    if (svgCont && rect) {
      svgCont.append(rect);
    }
    this.addEvenetsOnDesks(rect, desk);
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

  addEvenetsOnDesks(rect: any, desk: any) {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    rect.addEventListener('click', () => {
      if (desk.fill === 'green') {
        this.dialog
          .open(BookDeskComponent, {
            disableClose: true,
            data: {
              currentDesk: desk,
              user: currentUser,
            },
          })
          .afterClosed()
          .subscribe(() => {});
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
    });
  }

  onLoadMapForPeriod(admin: any, svgCont: any, date: any) {
    this.getUserTemplate(admin).subscribe((res: any) => {
      if (res.areas) {
        res.areas.forEach((area: any) => {
          this.onDrawAreas(svgCont, area);
        });
      }
      if (res.desks) {
        res.desks.forEach((desk: any) => {
          let fillColor;
          if (desk.status === 'blocked') {
            fillColor = 'gray';
          } else if (desk.bookedHistory && desk.bookedHistory.length > 0) {
            desk.bookedHistory.forEach((hist: any) => {
              const b = hist.date === date;
              if (b) {
                fillColor = 'orange';
              } else {
                fillColor = 'green';
              }
            });
          } else {
            fillColor = 'green';
          }
          this.onDrawDesks(svgCont, desk, fillColor);
        });
      }
    });
  }

  firsMapLoad(admin: any, svgCont: any) {
    this.getUserTemplate(admin).subscribe((res: any) => {
      if (res.areas) {
        res.areas.forEach((area: any) => {
          this.onDrawAreas(svgCont, area);
        });
      }
      if (res.desks) {
        res.desks.forEach((desk: any) => {
          this.onDrawDesks(svgCont, desk, 'gray');
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

  updateDesk(admin: User, desk: Desk, updatedDesk: Desk) {
    return this.http.put(
      `${url}/users/${admin.id}/desks/${desk.id}.json`,
      updatedDesk
    );
  }

  getUsersDeskHistory(user: any): Observable<any> {
    return this.http.get(`${url}/users/${user.id}/bookedDesk.json`);
  }

  updateUserDeskHistory(user: any, deskId: any, deskHistoryUpdated: any) {
    return this.http.put(
      `${url}/users/${user.id}/bookedDesk/${deskId}.json`,
      deskHistoryUpdated
    );
  }

  deleteDeskBooked(admin: any, deskId: any, index: any) {
    return this.http.delete(
      `${url}/users/${admin.id}/desks/${deskId}/bookedHistory/${index}.json`
    );
  }
}
