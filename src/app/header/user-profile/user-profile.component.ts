import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth, updatePassword } from '@firebase/auth';
import { onOpenSnackBar } from 'src/app/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  user: any;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  public changePassword = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  onChangePassword() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (
      this.changePassword.controls['password'].value ===
      this.changePassword.controls['confirmPassword'].value
    ) {
      updatePassword(user!, this.changePassword.controls['password'].value)
        .then(() => {
          onOpenSnackBar(this.snackBar, 'Change password successful.');
          this.router.navigate(['/home']);
        })
    } else {
      onOpenSnackBar(this.snackBar, "The passwords don't match.");
    }
  }
}
