import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Desk } from '../interfaces/map';
import { CheckInComponent } from '../office-plan/check-in/check-in.component';
import { OfficePlanService } from '../office-plan/office-plan-service/office-plan.service';
import { UnbookDeskComponent } from '../office-plan/unbook-desk/unbook-desk.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userBookedDeskHistory: any;
  public userRole: string = '';
  public user: any;
  private currentDesk: any;
  constructor(
    private officePlanService: OfficePlanService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
    this.userRole = user.role;
    this.officePlanService.getUsersDeskHistory(user).subscribe((res) => {
      this.userBookedDeskHistory = res.slice().reverse();
      this.userBookedDeskHistory.slice().reverse();
    });
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
      .subscribe((res) => {
        const deskIndex = this.userBookedDeskHistory.findIndex(
          (d: any) => d.id === res.id
        );
        this.userBookedDeskHistory.splice(deskIndex, 1, res);
      });
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
      // .afterClosed()
      // .subscribe((res) => {
      //   const deskIndex = this.userBookedDeskHistory.findIndex(
      //     (d: any) => d.id === res.id
      //   );
      //   this.userBookedDeskHistory.splice(deskIndex, 1, res);
      // });
  }
}
