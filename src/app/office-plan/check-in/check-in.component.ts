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
    private officePlanService: OfficePlanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<CheckInComponent>
  ) {}

  ngOnInit() {}

  onCheckIn() {
    this.bookService.updateDeskParams(this.data.currentDesk.currentDesk, {
      ...this.data.currentDesk.currentDesk,
      fill: 'red',
      status: 'checked',
    });

    this.data.currentDesk.currentDesk.fill = 'red';
    this.data.currentDesk.currentDesk.status = 'checked';

    this.officePlanService
      .updateUserDeskHistory(this.data.user, this.data.currentDesk.id, {
        ...this.data.currentDesk,
        status: 'checked',
      })
      .subscribe((res) => {
        this.dialogRef.close(res);
      });
  }
}
