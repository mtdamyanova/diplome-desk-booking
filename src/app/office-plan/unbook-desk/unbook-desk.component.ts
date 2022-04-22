import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  onUnbookDesk() {
    this.officePlanService.changeDeskStatus(this.data, 'available');
    this.dialog.closeAll();
  }
}
