import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import { actionCodeSettings } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  signUpUser(userData: any) {
    const userInfo = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: 'admin',
    };
    const auth = getAuth();
    console.log(userData);
    
    if (userData.password === userData.confirmPassword) {
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
          // this.sendVerificationEmail(user)
          this.setUser(user).subscribe();

          // ...
        })
        .catch((error) => {
          console.log(error);

          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      console.log('diff password');
      return;
    }
  }

  setUser(user: any) {
    return this.http.put(
      `https://diplome-7189f-default-rtdb.firebaseio.com/users/${user.id}.json`,
      user
    );
  }

}
