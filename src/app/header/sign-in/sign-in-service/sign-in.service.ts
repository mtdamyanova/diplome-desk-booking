import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BehaviorSubject, map } from 'rxjs';
import { onOpenSnackBar } from 'src/app/utils';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private user = new BehaviorSubject<any>({});
  castUser = this.user.asObservable();
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getUsers() {
    return this.http
      .get<{ [key: string]: any }>(
        `${url}/users.json`
      )
      .pipe(
        map((res) => {
          const users: any[] = [];
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              users.push(res[key]);
            }
          }
          return users;
        })
      );
  }

  signInUser(userData: any) {
    const auth = getAuth();
    return this.getUsers().subscribe((res) => {
      const currentUser = res.find((user) => user.email === userData.email);
      signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((res) => {
          const setUser = {
            email: currentUser.email,
            firstName: currentUser.firstName,
            id: currentUser.id,
            role: currentUser.role,
            companyName: currentUser.companyName,
          };
          localStorage.setItem('user', JSON.stringify(setUser));
          JSON.parse(localStorage.getItem('user')!);
          onOpenSnackBar(this.snackBar, `Welcome, ${currentUser.firstName}!`);
          this.user.next(setUser);
          this.router.navigate(['/office-plan']);
        })
        .catch((error) => {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
          onOpenSnackBar(this.snackBar, error.message);
        });
    });
  }

  signOut() {
    const auth = getAuth();
    return auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/sign-in']);
    });
  }
}
