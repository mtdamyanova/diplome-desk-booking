import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Admin } from 'src/app/interfaces/user';
import { AddEmployeesService } from './add-employees-service/add-employees.service';

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
    private signInService: SignInService,
    private matDialogRef: MatDialogRef<AddEmployeesComponent>
  ) {}

  ngOnInit() {}

  onRegisterEmployees() {
    const adminCompany = JSON.parse(localStorage.getItem('user')!);
    this.signInService
      .getUsers()
      .pipe(
        tap((res: any) =>
          res ? res.find((admin: Admin) => admin.id === adminCompany.id) : null
        ),
        tap((res: Admin) => {
          let userData = null;
          res
            ? (userData = {
                firstName: this.formData.controls['firstName'].value,
                companyName: res.companyName,
                email: this.formData.controls['email'].value,
              })
            : null;
          this.addEmployeeService.addEmployee(userData, res.template);
        })
      )
      .subscribe();
  }
}
