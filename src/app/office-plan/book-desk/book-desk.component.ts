import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private signInService: SignInService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onBookDesk() {
    this.signInService.getUsers().subscribe((res) => {
      const currentUser = JSON.parse(localStorage.getItem('user')!);
      const admin = res.find(
        (user) =>
          user.role === 'admin' && user.companyName === currentUser.companyName
      );
      if (admin.desks.length > 0) {
        const desk = admin.desks.find((d: any) => d.id === this.data.id);
        const updatedDesk = {
          ...desk,
          status: 'booked',
          bookedBy: currentUser.firstName,
        };
        this.officePlanService.updateDesk(admin, desk, updatedDesk).subscribe();
      }
    });
  }
}
