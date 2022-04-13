import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { map } from 'rxjs';
import { onOpenSnackBar } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

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
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        console.log(userCredential);
        
        this.getCurrentUser(userData.email);
      })
      .catch((error) => {
        console.log(error.message);
        onOpenSnackBar(this.snackBar, error.message);
      });
  }
}
