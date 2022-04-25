import {
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { Desk } from '../interfaces/map';
import { BookDeskComponent } from './book-desk/book-desk.component';
import { OfficePlanService } from './office-plan-service/office-plan.service';
import { UnbookDeskComponent } from './unbook-desk/unbook-desk.component';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss'],
})
export class OfficePlanComponent implements OnInit {
  @ViewChild('tooltip') tooltip!: ElementRef;
  private admin: any;
  private officeDesks: Desk[] = [];

  constructor(
    private officePlanService: OfficePlanService,
    private signInService: SignInService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.onGetUserTemplate();
    this.getDesks();
  }

  getDesks() {
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
        this.admin = admin;
        this.officePlanService.onDrawOfficePlan(admin, svgCont);
      }
    });
  }

  onMouseEnter(event: any) {
    const fillAttribute = event.target.getAttribute('fill');
    if (fillAttribute && fillAttribute !== 'white') {
      const desk = this.officeDesks.find(
        (d) => d.id === event.target.getAttribute('id')
      );
      this.officePlanService
        .getCurrentDesk(desk?.id, this.admin.id)
        .subscribe((res: any) => {
          if (res && desk) {
            let message = '';
            switch (res.status) {
              case 'available':
                message =
                  'The desk is available. You can book it by clicking on it.';
                break;
              case 'booked':
                message = `The desk is booked by ${res.bookedBy}.`;
                break;
              default:
                message = 'Test message.';
            }
            if(message){

              this.tooltipFunc(event.target, message);
            }
          }
        });
    }
  }

  tooltipFunc(target: any, message: string) {
    target.addEventListener('mouseover', () => {
      this.officePlanService.mouseEnterTooltip(
        this.renderer,
        target,
        this.tooltip,
        message
      );
    });
  }

  onMouseLeave() {
    this.officePlanService.mouseLeave(this.renderer, this.tooltip);
  }
}
