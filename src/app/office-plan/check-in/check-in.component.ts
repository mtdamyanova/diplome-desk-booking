import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDeskService } from '../book-desk/book-desk-service/book-desk.service';
import { OfficePlanService } from '../office-plan-service/office-plan.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  constructor(
    private bookService: BookDeskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<CheckInComponent>
  ) {}

  ngOnInit() {}

  onCheckIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.bookService.bookDesk(this.data.currentDesk.currentDesk, user,'checked');
    this.dialogRef.close();
  }
}
