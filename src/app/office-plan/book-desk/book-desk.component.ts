import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private matDialogRef: MatDialogRef<BookDeskComponent>
  ) {}

  ngOnInit() {}

  onBookDesk() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.officePlanService.bookDesk(this.data.currentDesk, user);
    this.matDialogRef.close();
  }

  onBlockDesk() {
    // this.officePlanService.changeDeskStatus(this.data.currentDesk, 'blocked');
    localStorage.setItem('deskStatus', 'blocked');
    this.matDialogRef.close();
  }
}
