import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { BookDeskComponent } from './book-desk/book-desk.component';
import { OfficePlanService } from './office-plan-service/office-plan.service';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss'],
})
export class OfficePlanComponent implements OnInit {
  @ViewChild('tooltip') tooltip!: ElementRef;
  private officeDesks: any[] = [];

  constructor(
    private officePlanService: OfficePlanService,
    private signInService: SignInService,
    private renderer: Renderer2,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.onGetUserTemplate();
    this.signInService.getUsers().subscribe((res) => {
      const user = JSON.parse(localStorage.getItem('user')!);
      const adminProfile = res.find(
        (admin) =>
          admin.role === 'admin' && admin.companyName === user.companyName
      );
      if (adminProfile.desks) {
        this.officeDesks = adminProfile.desks;
      }
    });
  }

  onGetUserTemplate() {
    const svgCont = document.getElementById('officePlan');
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    this.signInService.getUsers().subscribe((res) => {
      const admin = res.find(
        (user) =>
          user.role === 'admin' && user.companyName === currentUser.companyName
      );
      if (admin) {
        this.officePlanService.onDrawOfficePlan(admin, svgCont);
      }
    });
  }

  onMouseEnter() {
    const desks = document.getElementsByTagName('rect');
    const filtered = Array.prototype.slice
      .call(desks)
      .filter((desk) => desk.getAttribute('fill') !== 'white');
    filtered.forEach((desk) => {
      const currentDesk = this.officeDesks.find((d) => d.id === desk.id);
      const deskStatus = this.officePlanService.showStatusOfTheDesk(
        currentDesk.status
      );
      if (currentDesk.status === 'available') {
        desk.addEventListener('click', () => {
          this.dialog.open(BookDeskComponent,{
            data : currentDesk
          });

        });
      }
      desk.addEventListener('mouseover', () => {
        this.officePlanService.mouseEnterTooltip(
          this.renderer,
          desk,
          this.tooltip,
          deskStatus
        );
      });
    });
  }

  onMouseLeave() {
    this.officePlanService.mouseLeave(this.renderer, this.tooltip);
  }

}
