import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, map, tap } from 'rxjs';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { ManipulateDeskService } from 'src/app/manipulate-desk/manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-delete-employee-rights',
  templateUrl: './delete-employee-rights.component.html',
  styleUrls: ['./delete-employee-rights.component.scss'],
})
export class DeleteEmployeeRightsComponent {
  formData = new FormGroup({
    email: new FormControl('', Validators.required),
  });
  constructor(
    private signInService: SignInService,
    private manipulateDeskService: ManipulateDeskService,
    private matDialogRef : MatDialogRef<DeleteEmployeeRightsComponent>
  ) {}

  onDeleteEmployeRigths() {
    this.signInService
      .getUsers()
      .pipe(
        map((res) =>
          res.find(
            (empl) =>
              empl.email === this.formData.controls['email'].value.trim()
          )
        ),
        filter((res) => !!res),
        tap((res) => {
          const updatedUser = {
            ...res,
            accessRights: false,
          };
          this.manipulateDeskService.updateUser(res, updatedUser).subscribe();
        })
      )
      .subscribe(()=>{
        this.matDialogRef.close();
      });
  }
}
