import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './sign-up-service/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  public signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private signUpService: SignUpService) {}

  onSignUp() {
    const userData = {
      firstName: this.signUpForm.controls['firstName'].value,
      companyName: this.signUpForm.controls['companyName'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
      confirmPassword: this.signUpForm.controls['confirmPassword'].value,
    };
    this.signUpService.signUpUser(userData, 'admin');
  }
}
