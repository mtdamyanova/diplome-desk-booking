import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, tap } from 'rxjs';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { ManipulateDeskService } from '../manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  constructor(
    private manipulateDeskService: ManipulateDeskService,
    private signInService : SignInService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CheckInComponent>
  ) {}

  ngOnInit() {}

  onCheckIn() {
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
        'checked in',
        this.dialogRef
      ))
    )
    .subscribe()
  }

  onHandClose(){
    this.dialogRef.close()
  }
}
