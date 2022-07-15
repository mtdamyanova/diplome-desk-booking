import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Employee, UserDataOnSingUp } from 'src/app/interfaces/user';
import { onOpenSnackBar } from 'src/app/utils';
const url =
  'https://diplome-bc509-default-rtdb.europe-west1.firebasedatabase.app/';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  signUpUser(userData: UserDataOnSingUp, role: string) {
    const userInfo = {
      accessRights: true,
      firstName: userData.firstName,
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
        });
    } else {
      onOpenSnackBar(this.snackBar, "The passwords don't match.");
      return;
    }
  }

  setUser(user: Employee) {
    return this.http.put(`https://diplome-bc509-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json`, user);
  }
}
