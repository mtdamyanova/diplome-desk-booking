import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManipulateDeskService } from 'src/app/manipulate-desk/manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  constructor(
    private manipulateDeskService: ManipulateDeskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<CheckInComponent>
  ) {}

  ngOnInit() {}

  onCheckIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.manipulateDeskService.bookDesk(this.data.currentDesk.currentDesk, user,'checked');
    this.dialogRef.close();
  }
}
