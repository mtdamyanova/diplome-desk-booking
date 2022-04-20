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
}
