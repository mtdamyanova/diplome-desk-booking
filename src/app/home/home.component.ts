import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { Desk } from '../interfaces/map';
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
      this.userBookedDeskHistory = res;
    });
  }

  onUnbookDesk(deskId: string) {
    const currentDesk = this.userBookedDeskHistory.find(
      (desk: Desk) => desk.id === deskId
    );
    this.dialog.open(UnbookDeskComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        currentDesk: currentDesk.currentDesk,
        user: this.user,
        deskHistory: this.userBookedDeskHistory,
        deskId : currentDesk
      },
    });
  }
}
