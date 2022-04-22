import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Desk } from 'src/app/interfaces/map';
import { OfficePlanService } from '../office-plan-service/office-plan.service';

@Component({
  selector: 'app-book-desk',
  templateUrl: './book-desk.component.html',
  styleUrls: ['./book-desk.component.scss'],
})
export class BookDeskComponent implements OnInit {
  public desk: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private officePlanService: OfficePlanService,
    private matDialogRef : MatDialogRef<BookDeskComponent>
  ) {
  }

  ngOnInit() {}

  onBookDesk() {
    this.officePlanService.changeDeskStatus(this.data.currentDesk, 'booked');
    this.matDialogRef.close();
  }
}
