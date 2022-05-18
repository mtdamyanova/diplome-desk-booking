import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { ManipulateDeskService } from 'src/app/manipulate-desk/manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-delete-employee-rights',
  templateUrl: './delete-employee-rights.component.html',
  styleUrls: ['./delete-employee-rights.component.scss'],
})
export class DeleteEmployeeRightsComponent implements OnInit {
  formData = new FormGroup({
    email: new FormControl('', Validators.required),
  });
  constructor(
    private signInService: SignInService,
    private manipulateDeskService: ManipulateDeskService
  ) {}

  ngOnInit() {}
  onDeleteEmployeRigths() {
    this.signInService.getUsers().subscribe((res) => {
      const emailValue = this.formData.controls['email'].value.trim();
      const empl = res.find((empl) => empl.email === emailValue);
      if (empl) {
        const updatedUser = {
          ...empl,
          accessRights: false,
        };
        this.manipulateDeskService.updateUser(empl, updatedUser).subscribe();
      }
    });
  }
}
