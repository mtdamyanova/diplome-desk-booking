import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Desk } from 'src/app/interfaces/map';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class OfficePlanService {
  constructor(private http: HttpClient, private signInService: SignInService) {}
  getUserTemplate(user: any) {
    return this.http.get(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${user.id}.json`
    );
  }

  onDrawOfficePlan(user: any, svgCont: any) {
    this.getUserTemplate(user).subscribe((res: any) => {
      if (res.areas) {
        res.areas.forEach((area: any) => {
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
        });
      }
      if (res.desks) {
        res.desks.forEach((desk: any) => {
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

  showStatusOfTheDesk(status: string) {
    let message = '';
    switch (status) {
      case 'available':
        message = 'The desk is available.';
        break;
      case 'booked':
        message = 'The desk is booked.';
        break;
      default:
        message = 'Test message.';
    }
    return message;
  }

  updateDesk(admin : User, desk : Desk, updatedDesk : Desk){
    return this.http.put(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${admin.id}/desks/${desk.id}.json`,
      updatedDesk
    )
  }

}
