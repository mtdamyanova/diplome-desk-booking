import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { onOpenSnackBar } from 'src/app/utils';

@Component({
  selector: 'app-login-help',
  templateUrl: './login-help.component.html',
  styleUrls: ['./login-help.component.scss'],
})
export class LoginHelpComponent implements OnInit {
  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(public afAuth: AngularFireAuth, private snackBar: MatSnackBar) {}
  ngOnInit() {}

  onResetPassword() {
    console.log(this.formData.controls['email'].value);
    const email = this.formData.controls['email'].value;
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        onOpenSnackBar(
          this.snackBar,
          'Password reset email sent, check your inbox.'
        );
      })
      .catch(() => {
        onOpenSnackBar(this.snackBar, 'Invalid email.');
      });
  }
}
