import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeesService {
  constructor(private http: HttpClient) {}

  addEmployee(userData: any, template: string) {
    const admin = JSON.parse(localStorage.getItem('user')!);
    const userInfo = {
      firstName: userData.firstName,
      email: userData.email,
      role: 'employee',
      template: template,
      companyName : admin.companyName
    };
    const auth = getAuth();
    return createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.email
    )
      .then((userCredential) => {
        // Signed in
        const user = {
          id: userCredential.user.uid,
          accessRights : true,
          ...userInfo,
        };
        this.setUser(user).subscribe();
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  setUser(user: any) {
    return this.http.put(
      `${url}/users/${user.id}.json`,
      user
    );
  }
}
