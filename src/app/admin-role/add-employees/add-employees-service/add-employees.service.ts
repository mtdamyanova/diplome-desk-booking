import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeesService {
  constructor(private http: HttpClient) {}

  addEmployee(userData: any, template: string) {
    const userInfo = {
      firstName: userData.firstName,
      email: userData.email,
      role: 'employee',
      template: template,
    };
    const auth = getAuth();
    return createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = {
          id: userCredential.user.uid,
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
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${user.id}.json`,
      user
    );
  }
  generatePassword() {
    let length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  registerEmployee() {}
}
