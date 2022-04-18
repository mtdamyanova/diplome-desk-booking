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
}
