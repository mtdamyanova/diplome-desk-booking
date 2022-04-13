import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from './sign-in-service/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  hide: boolean = true;
  public dataForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private signInService: SignInService) {}

  ngOnInit() {}

  onSignIn() {
    const userData = {
      email: this.dataForm.controls['email'].value,
      password: this.dataForm.controls['password'].value,
    };
    this.signInService.signInUser(userData);
  }
}
