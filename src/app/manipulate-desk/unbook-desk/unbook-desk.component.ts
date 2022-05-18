import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { OfficePlanService } from 'src/app/office-plan/office-plan-service/office-plan.service';
import { ManipulateDeskService } from '../manipulate-desk-service/manipulate-desk.service';

@Component({
  selector: 'app-unbook-desk',
  templateUrl: './unbook-desk.component.html',
  styleUrls: ['./unbook-desk.component.scss'],
})
export class UnbookDeskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private officePlanService: OfficePlanService,
    private dialogRef: MatDialogRef<UnbookDeskComponent>,
    private signInService: SignInService,
    private bookService: ManipulateDeskService
  ) {}

  ngOnInit() {}

  onUnbookDesk() {
    this.signInService.getUsers().subscribe((res) => {
      const admin = res.find(
        (us) =>
          us.role === 'admin' && us.companyName === this.data.user.companyName
      );
      if (admin.desks && this.data.user.id) {
        const desk = admin.desks.find(
          (d: any) => d.id == this.data.currentDesk.currentDesk.id
        );
        const index = desk.bookedHistory.findIndex(
          (d: any) =>
            d.userId === this.data.user.id &&
            d.date === this.data.currentDesk.date
        );
        this.officePlanService
          .deleteDeskBooked(admin, desk.id, index)
          .subscribe();
      }

      this.bookService.updateDeskParams(this.data.currentDesk.currentDesk, {
        ...this.data.currentDesk.currentDesk,
        fill: 'green',
        status: 'available',
      });

      this.data.currentDesk.currentDesk.fill = '#d6ebb5';
      this.data.currentDesk.currentDesk.status = 'available';

      this.officePlanService
        .updateUserDeskHistory(this.data.user, this.data.currentDesk.id, {
          ...this.data.currentDesk,
          status: 'unbooked',
        })
        .subscribe((res) => {
          this.dialogRef.close(res);
        });
    });
  }
}
