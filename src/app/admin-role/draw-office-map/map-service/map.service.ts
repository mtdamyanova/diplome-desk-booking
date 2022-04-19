import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getSVGPoint(event: any, element: any): SVGPoint {
    // get the mouse coordinates and set them to the SVG point
    const point = element.viewportElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const CTM = element.viewportElement.getScreenCTM();
    const svgPoint = point.matrixTransform(CTM.inverse());

    return svgPoint;
  }

  setUserTemplate(user: any, template: any) {
    const userUpdated = { ...user, template: template };
    return this.http.put(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${user.id}.json`,
      { ...userUpdated }
    );
  }
  getUserTemplate(user: any) {
    return this.http.get(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${user.id}.json`
    );
  }

  addDesk() {
    const svgCont = document.getElementById('dropzone');
    const svgns = 'http://www.w3.org/2000/svg';
    const circle = document.createElementNS(svgns, 'rect');
    circle.setAttribute('cx', '40');
    circle.setAttribute('cy', '40');
    circle.setAttribute('width', '40');
    circle.setAttribute('height', '40');
    circle.setAttribute('fill', 'green');
    circle.setAttribute('draggable', 'true');
    if (svgCont && circle) {
      svgCont.append(circle);
    }
  }

  addArea() {
    const svgCont = document.getElementById('dropzone');
    const svgns = 'http://www.w3.org/2000/svg';
    const rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('cx', '40');
    rect.setAttribute('cy', '40');
    rect.setAttribute('width', '70');
    rect.setAttribute('height', '70');
    rect.setAttribute('fill', 'white');
    rect.setAttribute('draggable', 'true');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('class', 'area');
    rect.innerHTML = 'asf';
    if (svgCont && rect) {
      svgCont.append(rect);
    }
  }
}
