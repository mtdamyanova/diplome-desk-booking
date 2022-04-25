import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    private matDialogRef: MatDialogRef<BookDeskComponent>,
    private router : Router
  ) {}

  ngOnInit() {}

  onBookDesk() {
    this.officePlanService.changeDeskStatus(this.data.currentDesk, 'booked');
    localStorage.setItem('deskStatus', 'booked');
    this.router.navigate(['home']);
    this.matDialogRef.close();
  }

  onBlockDesk() {
    this.officePlanService.changeDeskStatus(this.data.currentDesk, 'blocked');
    localStorage.setItem('deskStatus', 'blocked');
    this.matDialogRef.close();
  }
}
