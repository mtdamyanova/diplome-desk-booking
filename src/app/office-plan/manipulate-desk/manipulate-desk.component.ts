import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManipulateDeskService } from './manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-manipulate-desk',
  templateUrl: './manipulate-desk.component.html',
  styleUrls: ['./manipulate-desk.component.scss'],
})
export class ManipulateDeskComponent implements AfterViewInit {
  public desk: string = '';

  public rectFill: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<ManipulateDeskComponent>,
    private manipulateDeskService: ManipulateDeskService
  ) {}

  ngAfterViewInit(): void {
    this.rectFill = this.data.desk.getAttribute('fill');
  }

  onBookDesk() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.manipulateDeskService.bookDesk(this.data.currentDesk, user, 'booked');
    this.matDialogRef.close();
  }

  onBlockDesk() {
    this.data.desk.setAttribute('fill', '#d9dae1');
    this.matDialogRef.close();
  }

  onUblockDesk() {
    this.data.desk.setAttribute('fill', '#d6ebb5');
    this.matDialogRef.close();
  }

  onRemoveDesk() {
    this.data.svgCont.removeChild(this.data.desk);
    this.matDialogRef.close();
  }
}
