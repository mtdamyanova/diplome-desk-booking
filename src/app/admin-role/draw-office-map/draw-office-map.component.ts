import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MapService } from './map-service/map.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
@Component({
  selector: 'app-draw-office-map',
  templateUrl: './draw-office-map.component.html',
  styleUrls: ['./draw-office-map.component.scss'],
})
export class DrawOfficeMapComponent implements OnInit {
  userRole: string = '';
  widthSliderValue?: number;
  heightSliderValue?: number;
  selectedArea: any;
  disabledSlider: boolean = true;

  constructor(
    private mapService: MapService,
    public dialog: MatDialog,
    public signInService: SignInService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.onGetUserTemplate();
  }

  onAddDesk() {
    this.mapService.addDesk();
  }

  onAddArea() {
    this.mapService.addArea();
  }

  onResizeArea(event: any) {
    if (event.target.classList.value === 'area') {
      this.disabledSlider = false;
      const eventWidth = event.target.attributes.width.value;
      const eventHeight = event.target.attributes.height.value;
      this.widthSliderValue = parseInt(eventWidth);
      this.heightSliderValue = parseInt(eventHeight);
      this.selectedArea = event;
    } else {
      this.widthSliderValue = 0;
      this.heightSliderValue = 0;
      this.selectedArea = null;
      this.disabledSlider = true;
    }
  }

  onWidthChange(event: any) {
    this.selectedArea.target.attributes.width.value = event.value;
  }

  onHeightChange(event: any) {
    this.selectedArea.target.attributes.height.value = event.value;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onSetUserTemplate() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userRole = user.role;
    const template = document.getElementById('dropzone')?.innerHTML;
    this.mapService.setUserTemplate(user, template).subscribe();
  }

  onGetUserTemplate() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.mapService.getUserTemplate(user).subscribe((res: any) => {
      console.log(res);
      this.userRole = res.role;
      const svgContainer = document.getElementById('dropzone');
      if (svgContainer) {
        svgContainer.innerHTML = res.template;
      }
    });
  }

  onRegisterEmployees() {
    this.dialog.open(AddEmployeesComponent);
  }

  onNewWaySetTemplate() {
    const a = document.getElementsByTagName('rect');
    const desksArray = Array.prototype.slice.call(a);
    const areas = desksArray.filter((desk) => desk.classList.value === 'area');
    const desks = desksArray.filter((desk) => desk.classList.value !== 'area');
    const currentAdmin = JSON.parse(localStorage.getItem('user')!);
    this.signInService.getUsers().subscribe((res) => {
      const admin = res.find((user) => user.id === currentAdmin.id);
      console.log(admin);

      let desksParamsArray: any = [];
      let areasParamsArray: any = [];
      areas?.forEach((area, index) => {
        const x = area.getAttribute('x');
        const y = area.getAttribute('y');
        const width = area.getAttribute('width');
        const height = area.getAttribute('height');
        const fill = area.getAttribute('fill');
        const stroke = area.getAttribute('stroke');
        const areaParams = {
          id: index,
          x: x,
          y: y,
          width: width,
          height: height,
          fill: fill,
          stroke: stroke,
        };
        areasParamsArray.push(areaParams);
      });
      desks?.forEach((area, index) => {
        const x = area.getAttribute('x');
        const y = area.getAttribute('y');
        const width = area.getAttribute('width');
        const height = area.getAttribute('height');
        const fill = area.getAttribute('fill');
        const areaParams = {
          id: index,
          x: x,
          y: y,
          width: width,
          height: height,
          fill: fill,
        };
        desksParamsArray.push(areaParams);
      });
      const adminUpdated = {
        ...admin,
        desks: desksParamsArray,
        areas: areasParamsArray,
      };
      this.mapService.updateAdmin(admin, adminUpdated).subscribe();
      const template = document.getElementById('dropzone')?.innerHTML;
      console.log(template);

      this.mapService.setUserTemplate(adminUpdated, template).subscribe();
    });
  }

}
