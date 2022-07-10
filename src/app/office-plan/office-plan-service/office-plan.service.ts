import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Observable, tap } from 'rxjs';
import { Area, Desk } from 'src/app/interfaces/map';
import { Admin, User } from 'src/app/interfaces/user';
import { ManipulateDeskComponent } from 'src/app/manipulate-desk/manipulate-desk.component';
import { onOpenSnackBar, url } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class OfficePlanService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  getUserTemplate(user: User) {
    return this.http.get(`${url}/users/${user.id}.json`);
  }

  getCurrentDesk(deskId: any, adminId: string) {
    return this.http.get(`${url}/users/${adminId}/desks/${deskId}.json`);
  }

  onDrawDesks(svgCont: SVGElement, desk: Desk, fillColor: any) {
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
    this.addEvenetsOnDesks(rect, desk, fillColor);
  }

  onDrawAreas(svgCont: SVGElement, area: Area) {
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

  addEvenetsOnDesks(rect: SVGElement, desk: Desk, fillColor: string) {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    rect.addEventListener('click', () => {
      if (fillColor === '#d6ebb5') {
        this.dialog.open(ManipulateDeskComponent, {
          autoFocus: false,
          data: {
            currentDesk: desk,
            user: currentUser,
            rect: rect,
          },
        });
      }
      if (fillColor === '#ffe94b') {
        onOpenSnackBar(
          this.snackBar,
          'You cannot book this desk. It`s already booked'
        );
      }
      if (desk.status === 'blocked') {
        onOpenSnackBar(this.snackBar, 'This desk is blocked by your admin.');
      }
    });
  }

  onLoadMapForPeriod(admin: Admin, svgCont: any, date: any) {
    return this.getUserTemplate(admin).pipe(
      filter((res: any) => !!res.areas),
      tap((res: any) => {
        res.areas.forEach((area: Area) => {
          this.onDrawAreas(svgCont, area);
        });
      }),
      filter((res: any) => !!res.desks),
      tap((res: any) => {
        res.desks.forEach((desk: Desk) => {
          let fillColor;
          if (desk.status === 'blocked') {
            fillColor = '#d9dae1';
          } else if (desk.bookedHistory && desk.bookedHistory.length > 0) {
            desk.bookedHistory.forEach((hist: any) => {
              const b = hist.date === date;
              if (b && hist.status === 'booked') {
                fillColor = '#ffe94b';
              } else if (b && hist.status === 'checked in') {
                fillColor = '#ffc3a1';
              } else if (b && hist.status === 'unbooked') {
                fillColor = '#d6ebb5';
              } else {
                fillColor = '#d6ebb5';
              }
            });
          } else {
            fillColor = '#d6ebb5';
          }
          this.onDrawDesks(svgCont, desk, fillColor);
        });
      })
    );
  }

  firsMapLoad(admin: Admin, svgCont: any) {
    return this.getUserTemplate(admin).pipe(
      filter((res: any) => !!res.areas),
      tap((res: any) => {
        res.areas.forEach((area: Area) => {
          this.onDrawAreas(svgCont, area);
        });
      }),
      filter((res: any) => !!res.desks),
      tap((res: any) => {
        res.desks.forEach((desk: Desk) => {
          this.onDrawDesks(svgCont, desk, '#d9dae1');
        });
      })
    );
  }

  mouseEnterTooltip(
    renderer: any,
    desk: HTMLElement,
    tooltip: any,
    message: string
  ) {
    let coordinates = desk.getBoundingClientRect();
    let x = `${coordinates.left + 30}px`;
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

  getUsersDeskHistory(user: User): Observable<any> {
    return this.http.get(`${url}/users/${user.id}/bookedDesk.json`);
  }

  updateUserDeskHistory(user: User, deskId: string, deskHistoryUpdated: any[]) {
    return this.http.put(
      `${url}/users/${user.id}/bookedDesk/${deskId}.json`,
      deskHistoryUpdated
    );
  }

  deleteOrCheckedInDeskBooked(
    admin: any,
    deskId: any,
    index: any,
    status: string
  ) {
    console.log(status);

    if (status === 'unbooked') {
      this.http
        .delete(
          `${url}/users/${admin.id}/desks/${deskId}/bookedHistory/${index}.json`
        )
        .subscribe();
    }
    if (status === 'checked in') {
      this.updateBookedDeskStatus(admin, deskId, index, status).subscribe();
    }
  }

  getBookedDesk(admin: Admin, deskId: string, index: number) {
    return this.http.get(
      `${url}/users/${admin.id}/desks/${deskId}/bookedHistory/${index}.json`
    );
  }

  updateBookedDeskStatus(
    admin: Admin,
    deskId: string,
    index: number,
    status: string
  ) {
    return this.getBookedDesk(admin, deskId, index).pipe(
      tap((res) => {
        this.http
          .put(
            `${url}/users/${admin.id}/desks/${deskId}/bookedHistory/${index}.json`,
            {
              ...res,
              status: status,
            }
          )
          .subscribe();
      })
    );
  }

  setTooltipMessage(
    desk: Desk | undefined,
    event: any,
    user: User,
    admin: any,
    date: any,
    renderer: any,
    tooltip: ElementRef
  ) {
    return this.getCurrentDesk(desk?.id, admin.id).pipe(
      tap((res: any) => {
        const rectFill = event.target.getAttribute('fill');
        let deskColor = '';
        let deskStatus = '';
        let message = '';
        let emplName = '';
        if (res && res.bookedHistory) {
          const empl = res.bookedHistory.find(
            (d: any) => d.date === date.nativeElement.value
          );
          emplName = empl?.userName;
        }

        switch (rectFill) {
          case '#ffe94b':
            message = `This place is booked by ${emplName}.`;
            deskColor = '#ffe9b4';
            deskStatus = 'BOOKED.';
            break;
          case '#ffc3a1':
            message = `This place is checked in by ${emplName}.`;
            deskColor = '#ffc3a1';
            deskStatus = 'CHECKED IN.';
            break;
          case '#d6ebb5':
            message = 'This place is preferred for booking.';
            deskColor = '#d6ebb5';
            deskStatus = 'AVAILABLE.';
            break;
          default:
            message = 'This place is not available for booking';
            deskColor = '#d9dae1';
            deskStatus = 'BLOCKED.';
            break;
        }
        message = `
            <div style="display:flex;
            align-items:baseline;
            padding:5px;">
            <p style="margin-right:10px">D${desk?.id}</p>
            <span id="span" style="height: 10px;
            width: 10px;
            background-color: ${deskColor};
            border-radius: 50%;
            display: inline-block;"></span>
            <span>${deskStatus}</span>
            </div>
            <p style="padding:5px">${message}</p>
            `;
        this.tooltipFunc(event.target, message, renderer, tooltip);
      })
    );
  }

  tooltipFunc(target: any, message: string, renderer: any, tooltip: any) {
    target.addEventListener('mouseover', () => {
      this.mouseEnterTooltip(renderer, target, tooltip, message);
    });
  }
}
