import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { Desk } from '../interfaces/map';
import { OfficePlanService } from './office-plan-service/office-plan.service';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss'],
})
export class OfficePlanComponent implements OnInit {
  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  private admin: any;
  private officeDesks: Desk[] = [];
  public minDate = new Date();

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

  onGetUserTemplate(date?: any) {
    const svgCont = document.getElementById('officePlan');
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    this.signInService.getUsers().subscribe((res) => {
      const admin = res.find(
        (user) =>
          user.role === 'admin' && user.companyName === currentUser.companyName
      );
      if (admin) {
        this.admin = admin;
        this.officePlanService.firsMapLoad(admin, svgCont);
      }
    });
  }

  onShowMap() {
    const date = this.date.nativeElement.value;
    localStorage.setItem('period', JSON.stringify(date));
    if (date) {
      const svgCont = document.getElementById('officePlan');
      const currentUser = JSON.parse(localStorage.getItem('user')!);
      this.signInService.getUsers().subscribe((res) => {
        const admin = res.find(
          (user) =>
            user.role === 'admin' &&
            user.companyName === currentUser.companyName
        );
        if (admin) {
          this.admin = admin;
          this.officePlanService.onLoadMapForPeriod(admin, svgCont, date);
        }
      });
    }
  }

  onMouseEnter(event: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const fillAttribute = event.target.getAttribute('fill');
    if (fillAttribute && fillAttribute !== 'white') {
      const desk = this.officeDesks.find(
        (d) => d.id === event.target.getAttribute('id')
      );
      this.officePlanService
        .getCurrentDesk(desk?.id, this.admin.id)
        .subscribe((res: any) => {
          let message = '';
          const hasBookedHistory =
            res.bookedHistory && this.date.nativeElement.value;
          const rectFill = event.target.getAttribute('fill');
          if (hasBookedHistory) {
            const bookedByUser = res.bookedHistory.find(
              (d: any) =>
                d.date === this.date.nativeElement.value && d.userId === user.id
            );
            bookedByUser
              ? (message = `The desk is ${
                  bookedByUser.status === 'booked' ? 'booked' : 'checked'
                } by ${bookedByUser.userName}.`)
              :  message = 'This place is preferred for booking.';
          } else if (!hasBookedHistory && rectFill === 'green') {
            message = 'This place is preferred for booking.';
          } else {
            message = 'This place is not available for booking';
          }

          if (message) {
            this.tooltipFunc(event.target, message);
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
