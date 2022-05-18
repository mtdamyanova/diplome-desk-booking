import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { onOpenSnackBar } from 'src/app/utils';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  signUpUser(userData: any, role: string) {
    const userInfo = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      companyName: userData.companyName,
      email: userData.email,
      role: role,
    };
    const auth = getAuth();

    if (userData.password === userData.confirmPassword) {
      return createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )
        .then((userCredential) => {
          const user = {
            id: userCredential.user.uid,
            ...userInfo,
          };
          this.setUser(user).subscribe();
          onOpenSnackBar(this.snackBar, 'Registration successful.');
          this.router.navigate(['/sign-in']);
        })
        .catch((error) => {
          const errorMessage = error.message;
          onOpenSnackBar(this.snackBar, errorMessage);
        });
    } else {
      onOpenSnackBar(this.snackBar, "The passwords don't match.");
      return;
    }
  }

  setUser(user: any) {
    return this.http.put(`${url}/users/${user.id}.json`, user);
  }

}
