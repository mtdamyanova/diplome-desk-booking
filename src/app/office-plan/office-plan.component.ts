import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { OfficePlanService } from './office-plan-service/office-plan.service';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss'],
})
export class OfficePlanComponent implements OnInit {
  @ViewChild('tooltip') tooltip!: ElementRef;

  constructor(
    private officePlanService: OfficePlanService,
    private signInService: SignInService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.onGetUserTemplate();
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
      desk.addEventListener('mouseover', () => {
        this.officePlanService.mouseEnterTooltip(
          this.renderer,
          desk,
          this.tooltip,
          '5'
        );
      });
    });
  }

  onMouseLeave() {
    this.officePlanService.mouseLeave(this.renderer, this.tooltip);
  }
}
