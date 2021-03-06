import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManipulateDeskService } from './manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-manipulate-desk',
  templateUrl: './manipulate-desk.component.html',
  styleUrls: ['./manipulate-desk.component.scss'],
})
export class ManipulateDeskComponent {
  public desk: string = '';

  public rectFill: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<ManipulateDeskComponent>,
    private manipulateDeskService: ManipulateDeskService
  ) {}

  onBookDesk() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.manipulateDeskService.bookDesk(this.data.currentDesk, user, 'booked');
    this.matDialogRef.close();
  }
}
