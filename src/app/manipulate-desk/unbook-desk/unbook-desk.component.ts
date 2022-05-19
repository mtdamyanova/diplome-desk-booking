import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, tap } from 'rxjs';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Desk } from 'src/app/interfaces/map';
import { OfficePlanService } from 'src/app/office-plan/office-plan-service/office-plan.service';
import { ManipulateDeskService } from '../manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-unbook-desk',
  templateUrl: './unbook-desk.component.html',
  styleUrls: ['./unbook-desk.component.scss'],
})
export class UnbookDeskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UnbookDeskComponent>,
    private manipulateDeskService: ManipulateDeskService,
    private signInService: SignInService
  ) {}

  ngOnInit() {}

  onUnbookDesk() {
    this.signInService
      .getUsers()
      .pipe(
        map((res) =>
          res.find(
            (us) =>
              us.role === 'admin' &&
              us.companyName === this.data.user.companyName
          )
        ),
        tap((admin)=>this.manipulateDeskService.unbookOrCheckedInDesk(
          admin,
          this.data,
          'unbooked',
          this.dialogRef
        ))
      )
      .subscribe()
  }
}
