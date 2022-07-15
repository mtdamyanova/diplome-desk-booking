import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { filter, map, tap } from 'rxjs';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';
import { Desk } from '../interfaces/map';
import { Admin } from '../interfaces/user';
import { OfficePlanService } from './office-plan-service/office-plan.service';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss'],
})
export class OfficePlanComponent implements OnInit {
  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  private admin!: Admin;
  private officeDesks: Desk[] = [];
  public minDate = new Date();
  public deskStatus!: string;
  public deskId!: string;

  constructor(
    private officePlanService: OfficePlanService,
    private signInService: SignInService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.onShowMapOnFirstLoad().subscribe();
    this.getDesks().subscribe();
  }

  getDesks() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return this.signInService.getUsers().pipe(
      map((res) =>
        res.find(
          (admin) =>
            admin.role === 'admin' && admin.companyName === user.companyName
        )
      ),
      filter((res) => !!res),
      tap((res) => (this.officeDesks = res.desks))
    );
  }

  onShowMapOnFirstLoad() {
    const svgCont = document.getElementById('officePlan');
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    return this.signInService.getUsers().pipe(
      map((res) =>
        res.find(
          (user) =>
            user.role === 'admin' &&
            user.companyName === currentUser.companyName
        )
      ),
      filter((res) => !!res),
      tap((res) => {
        this.admin = res;
        this.officePlanService.firstMapLoad(res, svgCont).subscribe();
      })
    );
  }

  onShowMapForPeriod() {
    const date = this.date.nativeElement.value;
    localStorage.setItem('period', JSON.stringify(date));
    const svgCont = document.getElementById('officePlan');
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    this.signInService
      .getUsers()
      .pipe(
        map((res) =>
          res.find(
            (user) =>
              user.role === 'admin' &&
              user.companyName === currentUser.companyName
          )
        ),
        filter((res) => !!res && !!date),
        tap((res) => {
          this.admin = res;
          this.officePlanService
            .onLoadMapForPeriod(res, svgCont, date)
            .subscribe();
        })
      )
      .subscribe();
  }

  onMouseEnter(event: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const fillAttribute = event.target.getAttribute('fill');
    const desk = this.officeDesks.find(
      (d) => d.id === event.target.getAttribute('id')
    );

    if (desk && fillAttribute && fillAttribute !== 'transparent') {
      this.deskStatus = desk.fill;
      this.deskId = desk.id;
      this.officePlanService
        .setTooltipMessage(
          desk,
          event,
          this.admin,
          this.date,
          this.renderer,
          this.tooltip
        )
        .subscribe();
    }
  }

  onMouseLeave() {
    this.officePlanService.mouseLeave(this.renderer, this.tooltip);
  }
}
