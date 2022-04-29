import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDeskService } from './book-desk-service/book-desk.service';

@Component({
  selector: 'app-book-desk',
  templateUrl: './book-desk.component.html',
  styleUrls: ['./book-desk.component.scss'],
})
export class BookDeskComponent implements OnInit {
  public desk: string = '';
  
  public rectFill: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<BookDeskComponent>,
    private bookDeskService: BookDeskService
  ) {}

  ngOnInit(): void {
    this.rectFill = this.data.rect.getAttribute('fill');
  }

  onBookDesk() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.bookDeskService.bookDesk(this.data.currentDesk, user,'booked');
    this.matDialogRef.close();
  }

  onBlockDesk() {
    this.data.rect.setAttribute('fill', 'gray');
    this.matDialogRef.close();
  }

  onUblockDesk(){
    this.data.rect.setAttribute('fill', 'green');
    this.matDialogRef.close();
  }
}
