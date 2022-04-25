import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfficePlanService } from '../office-plan-service/office-plan.service';

@Component({
  selector: 'app-unbook-desk',
  templateUrl: './unbook-desk.component.html',
  styleUrls: ['./unbook-desk.component.scss'],
})
export class UnbookDeskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private officePlanService: OfficePlanService,
    private dialogRef: MatDialogRef<UnbookDeskComponent>,
    private router : Router
  ) {}

  ngOnInit() {}

  onUnbookDesk() {
    this.officePlanService.changeDeskStatus(this.data.currentDesk, 'available');
    localStorage.setItem('deskStatus', 'available');

    this.officePlanService.updateUserDeskHistory(
      this.data.user,
      this.data.deskId.id,
      {
        ...this.data.deskId,
        status: 'unbooked',
      }
    ).subscribe(()=>{
    });
    this.dialogRef.close();
  }

  onUnblockDesk() {
    this.officePlanService.changeDeskStatus(this.data.currentDesk, 'available');
    localStorage.setItem('deskStatus', 'available');
    this.dialogRef.close();
  }
}
