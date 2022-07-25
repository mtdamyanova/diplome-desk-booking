import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { filter, map, Observable, tap } from 'rxjs';
import { Employee, UserDataOnSingUp } from 'src/app/interfaces/user';
import { onOpenSnackBar } from 'src/app/utils';
import { SignInService } from '../../sign-in/sign-in-service/sign-in.service';
const url =
  'https://diplome-bc509-default-rtdb.europe-west1.firebasedatabase.app/';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private signInService: SignInService
  ) {}

  isAvailableCompany(companyN: string): Observable<boolean> {
    return this.signInService.getUsers().pipe(
      map((res) => res.filter((u) => u.role === 'admin')),
      map((res) =>
        res.some(
          (c) =>
            c.companyName.trim().toLowerCase() === companyN.trim().toLowerCase()
        )
      )
    );
  }

  signUpUser(userData: UserDataOnSingUp, role: string) {
    const userInfo = {
      accessRights: true,
      firstName: userData.firstName,
      companyName: userData.companyName,
      email: userData.email,
      role: role,
    };
    const auth = getAuth();
    const isUsedCompany = this.isAvailableCompany(
      userData.companyName
    ).subscribe();

    if (userData.password === userData.confirmPassword && !isUsedCompany) {
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
      if (isUsedCompany) {
        onOpenSnackBar(this.snackBar, 'The company is already used.');
      } else {
        onOpenSnackBar(this.snackBar, "The passwords don't match.");
      }
      return;
    }
  }

  setUser(user: Employee) {
    return this.http.put(
      `https://diplome-bc509-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json`,
      user
    );
  }
}
