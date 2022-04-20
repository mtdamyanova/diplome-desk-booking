import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { OfficePlanService } from './office-plan-service/office-plan.service';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss'],
})
export class OfficePlanComponent implements OnInit {
  constructor(
    private officePlanService: OfficePlanService,
    private cdr: ChangeDetectorRef,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.onGetUserTemplate();
  }

  onGetUserTemplate() {
    const svgCont = document.getElementById('dropzone');
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser.role !== 'admin') {
      this.signInService.getUsers().subscribe((res) => {
        const admin = res.find(
          (user) =>
            user.role === 'admin' &&
            user.companyName === currentUser.companyName
        );
        if (admin) {
          this.onDrawOfficePlan(admin, svgCont);
        }
      });
    } else {
      this.onDrawOfficePlan(currentUser, svgCont);
    }
  }

  onDrawOfficePlan(user: any, svgCont: any) {
    this.officePlanService.getUserTemplate(user).subscribe((res: any) => {
      if (res.areas) {
        res.areas.forEach((area: any) => {
          const svgns = 'http://www.w3.org/2000/svg';
          const rect = document.createElementNS(svgns, 'rect');
          rect.setAttribute('x', area.x);
          rect.setAttribute('y', area.y);
          rect.setAttribute('width', area.width);
          rect.setAttribute('height', area.height);
          rect.setAttribute('fill', area.fill);
          rect.setAttribute('stroke', area.stroke);
          if (svgCont && rect) {
            svgCont.append(rect);
          }
        });
      }
      if (res.desks) {
        res.desks.forEach((desk: any) => {
          const svgns = 'http://www.w3.org/2000/svg';
          const rect = document.createElementNS(svgns, 'rect');
          rect.setAttribute('x', desk.x);
          rect.setAttribute('y', desk.y);
          rect.setAttribute('width', desk.width);
          rect.setAttribute('height', desk.height);
          rect.setAttribute('fill', desk.fill);
          if (svgCont && rect) {
            svgCont.append(rect);
          }
        });
      }
    });
  }
}
