import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Employee } from 'src/app/interfaces/user';
import { onOpenSnackBar } from 'src/app/utils';

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
    return this.http.get<{ [key: string]: any }>(`https://desk-booking-59893-default-rtdb.europe-west1.firebasedatabase.app/users.json`).pipe(
      map((res : any) => {
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
    return this.getUsers()
      .pipe(tap((res : any) => this.signInFirebase(userData, res)))
      .subscribe();
  }

  signInFirebase(userData: any, res: any) {
    const auth = getAuth();
    const currentUser = res.find((user: Employee) => user.email === userData.email);
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        if (currentUser.accessRights) {
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
          this.router.navigate(['/']);
        } else {
          onOpenSnackBar(
            this.snackBar,
            `${currentUser.firstName}, your access rights are removed.Please contact your admin!`
          );
        }
      })
      .catch((error) => {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
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
