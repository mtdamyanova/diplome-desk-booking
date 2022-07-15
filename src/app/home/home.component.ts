import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { Desk } from '../interfaces/map';
import { Employee } from '../interfaces/user';
import { CheckInComponent } from '../manipulate-desk/check-in/check-in.component';
import { UnbookDeskComponent } from '../manipulate-desk/unbook-desk/unbook-desk.component';
import { OfficePlanService } from '../office-plan/office-plan-service/office-plan.service';
import { faHomeUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userBookedDeskHistory: any;
  public userRole: string = '';
  public user: any;
  public faChair = faHomeUser;
  constructor(
    private officePlanService: OfficePlanService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.onGetUserDeskHistory(user).subscribe();
    }
  }

  onGetUserDeskHistory(user: Employee) {
    this.user = user;
    return this.officePlanService.getUsersDeskHistory(user).pipe(
      filter((res) => !!res),
      tap((res) => {
        this.userBookedDeskHistory = res.slice().reverse();
        this.userBookedDeskHistory.slice().reverse();
      })
    );
  }

  onUnbookDesk(deskId: string) {
    const currentDesk = this.userBookedDeskHistory.find(
      (desk: Desk) => desk.id === deskId
    );
    this.dialog
      .open(UnbookDeskComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          user: this.user,
          deskHistory: this.userBookedDeskHistory,
          currentDesk: currentDesk,
        },
      })
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        tap((res) => {
          const deskIndex = this.userBookedDeskHistory.findIndex(
            (d: any) => d.id === res.id
          );
          this.userBookedDeskHistory.splice(deskIndex, 1, res);
        })
      )
      .subscribe();
  }

  onCheckIn(deskId: string) {
    const currentDesk = this.userBookedDeskHistory.find(
      (desk: Desk) => desk.id === deskId
    );
    this.dialog
      .open(CheckInComponent, {
        autoFocus: false,
        data: {
          user: this.user,
          deskHistory: this.userBookedDeskHistory,
          currentDesk: currentDesk,
        },
      })
      .afterClosed()
      .pipe(
        tap(res=>console.log(res)),
        filter((res) => !!res),
        tap((res) => {
          const deskIndex = this.userBookedDeskHistory.findIndex(
            (d: any) => d.id === res.id
          );
          this.userBookedDeskHistory.splice(deskIndex, 1, res);
        })
      )
      .subscribe();
  }
}
