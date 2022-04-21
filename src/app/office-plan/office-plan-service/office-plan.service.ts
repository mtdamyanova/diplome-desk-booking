import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OfficePlanService {
  constructor(private http: HttpClient) {}
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
          rect.setAttribute('x', area.x);
          rect.setAttribute('y', area.y);
          rect.setAttribute('width', area.width);
          rect.setAttribute('height', area.height);
          rect.setAttribute('fill', area.fill);
          rect.setAttribute('stroke', area.stroke);
          if (svgCont && rect) {
            svgCont.append(rect);
          }
        });
      }
      if (res.desks) {
        res.desks.forEach((desk: any) => {
          const svgns = 'http://www.w3.org/2000/svg';
          const rect = document.createElementNS(svgns, 'rect');
          rect.setAttribute('x', desk.x);
          rect.setAttribute('y', desk.y);
          rect.setAttribute('width', desk.width);
          rect.setAttribute('height', desk.height);
          rect.setAttribute('fill', desk.fill);
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
}
