import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { onOpenSnackBar } from 'src/app/utils';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private user = new BehaviorSubject<string>('');
  castUser = this.user.asObservable();
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getUsers() {
    return this.http
      .get<{ [key: string]: any }>(
        'https://diplome-7189f-default-rtdb.firebaseio.com/users.json'
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

  getCurrentUser(userEmail: string) {
    return this.getUsers().subscribe((res) => {
      const currentUser = res.find((email) => email === userEmail);
      if (currentUser) {
        onOpenSnackBar(this.snackBar, `Welcome, ${currentUser.firstName}!`);
      }
    });
  }

  signInUser(userData: any) {
    const auth = getAuth();
    console.log(userData);

    return this.getUsers().subscribe((res) => {
      console.log(res);

      const currentUser = res.find((user) => user.email === userData.email);
      signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((res) => {
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: currentUser.email,
              firstName: currentUser.firstName,
              id: currentUser.id,
              role: currentUser.role,
              companyName : currentUser.companyName
            })
          );
          JSON.parse(localStorage.getItem('user')!);
          onOpenSnackBar(this.snackBar, `Welcome, ${currentUser.firstName}!`);
          this.user.next(currentUser.firstName);
          if (currentUser.role === 'admin') {
            this.router.navigate(['/office-plan']);
          }
        })
        .catch((error) => {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
          console.log(error.message);
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
