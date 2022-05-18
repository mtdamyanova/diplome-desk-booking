import { Component, OnInit } from '@angular/core';
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

  public dataForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private signUpService: SignUpService) {}

  onSignUp() {
    const userData = {
      firstName: this.dataForm.controls['firstName'].value,
      lastName: this.dataForm.controls['lastName'].value,
      companyName: this.dataForm.controls['companyName'].value,
      email: this.dataForm.controls['email'].value,
      password: this.dataForm.controls['password'].value,
      confirmPassword: this.dataForm.controls['confirmPassword'].value,
    };
    this.signUpService.signUpUser(userData, 'admin');
  }
}
