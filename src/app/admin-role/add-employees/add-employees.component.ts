import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateEmail } from '@firebase/auth';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { SignUpService } from 'src/app/header/sign-up/sign-up-service/sign-up.service';
import { AddEmployeesService } from './add-employees-service/add-employees.service';
import { EmailService } from './email.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss'],
})
export class AddEmployeesComponent implements OnInit {
  formData = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
  });
  constructor(
    private addEmployeeService: AddEmployeesService,
    private signInService: SignInService
  ) {}

  ngOnInit() {}

  onRegisterEmployees() {
    const adminCompany = JSON.parse(localStorage.getItem('user')!);
    this.signInService.getUsers().subscribe((res) => {
      const admin = res.find((admin) => admin.id === adminCompany.id);
      const userData = {
        firstName: this.formData.controls['firstName'].value,
        companyName: admin.companyName,
        email: this.formData.controls['email'].value,
      };
      this.addEmployeeService.addEmployee(userData, admin.template);
    });
  }
}
