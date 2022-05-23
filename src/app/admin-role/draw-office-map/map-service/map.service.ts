import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public deskId: string = '0';
  constructor(private http: HttpClient, private signInService: SignInService) {}

  getSVGPoint(event: any, element: any): SVGPoint {
    const point = element.viewportElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const CTM = element.viewportElement.getScreenCTM();
    const svgPoint = point.matrixTransform(CTM.inverse());
    return svgPoint;
  }

  setUserTemplate(user: any, template: any) {
    const userUpdated = { ...user, template: template };
    return this.http.put(`${url}/users/${user.id}.json`, { ...userUpdated });
  }

  getUserTemplate(user: any) {
    return this.http.get(`${url}/users/${user.id}.json`);
  }

  addDesk() {
    const rects = document.getElementsByTagName('rect');
    const desks: any[] = Array.prototype.slice
      .call(rects)
      .filter((rect) => rect.getAttribute('fill') !== 'white');
    const deskId = desks.length.toString();
    const svgCont = document.getElementById('dropzone');
    const svgns = 'http://www.w3.org/2000/svg';
    const desk = document.createElementNS(svgns, 'rect');
    desk.setAttribute('id', deskId);
    desk.setAttribute('cx', '40');
    desk.setAttribute('cy', '40');
    desk.setAttribute('width', '20');
    desk.setAttribute('height', '40');
    desk.setAttribute('fill', '#d6ebb5');
    desk.setAttribute('draggable', 'true');
    desk.setAttribute('class', 'changeSize desk');
    desk.setAttribute('cursor', 'pointer');
    if (svgCont && desk) {
      svgCont.append(desk);
    }
  }

  addArea() {
    const svgCont = document.getElementById('dropzone');
    const svgns = 'http://www.w3.org/2000/svg';
    const rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('width', '70');
    rect.setAttribute('height', '70');
    rect.setAttribute('fill', 'transparent');
    rect.setAttribute('draggable', 'true');
    rect.setAttribute('stroke', '#cdd2e4');
    rect.setAttribute('stroke-width', '6');
    rect.setAttribute('class', 'changeSize area');

    if (svgCont && rect) {
      svgCont.append(rect);
    }
  }

  updateAdmin(admin: any, adminUpdated: any) {
    return this.http.put(`${url}/users/${admin.id}.json`, adminUpdated);
  }

  setOfficeParameters(elements: any) {
    const desksArray = Array.prototype.slice.call(elements);
    const areas = desksArray.filter((desk) =>
      desk.classList.value.includes('area')
    );
    const desks = desksArray.filter((desk) =>
      desk.classList.value.includes('desk')
    );
    const currentAdmin = JSON.parse(localStorage.getItem('user')!);
    this.signInService.getUsers().subscribe((res) => {
      const admin = res.find((user) => user.id === currentAdmin.id);
      let desksParamsArray: any = [];
      let areasParamsArray: any = [];
      areas?.forEach((area, index) => {
        const x = area.getAttribute('x');
        const y = area.getAttribute('y');
        const width = area.getAttribute('width');
        const height = area.getAttribute('height');
        const fill = area.getAttribute('fill');
        const stroke = area.getAttribute('stroke');
        const areaParams = {
          id: index,
          x: x,
          y: y,
          width: width,
          height: height,
          fill: fill,
          stroke: stroke,
        };
        areasParamsArray.push(areaParams);
      });
      desks?.forEach((area, index) => {
        const x = area.getAttribute('x');
        const y = area.getAttribute('y');
        const width = area.getAttribute('width');
        const height = area.getAttribute('height');
        const fill = area.getAttribute('fill');
        let deskStatus = '';
        if (fill === '#d6ebb5') {
          deskStatus = 'available';
        } else if (fill === 'red') {
          deskStatus = 'checked in';
        } else if (fill === '#ffe94b') {
          deskStatus = 'booked';
        } else {
          deskStatus = 'blocked';
        }
        const deskParams = {
          id: index.toString(),
          x: x,
          y: y,
          width: width,
          height: height,
          fill: fill,
          status: deskStatus,
        };
        desksParamsArray.push(deskParams);
      });
      const adminUpdated = {
        ...admin,
        desks: desksParamsArray,
        areas: areasParamsArray,
      };
      this.updateAdmin(admin, adminUpdated).subscribe();
      const template = document.getElementById('dropzone')?.innerHTML;
      this.setUserTemplate(adminUpdated, template).subscribe();
    });
  }
}
