import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficePlanService } from 'src/app/office-plan/office-plan-service/office-plan.service';
import { ManipulateDeskService } from '../manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  constructor(
    private manipulateDeskService: ManipulateDeskService,
    private officePlanService: OfficePlanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CheckInComponent>
  ) {}

  ngOnInit() {}

  onCheckIn() {
    // this.manipulateDeskService.unbookOrCheckedInDesk(
    //   this.data,
    //   'checked in',
    //   this.dialogRef
    // );
  }
}
