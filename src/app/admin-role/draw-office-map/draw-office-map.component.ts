import { Component, OnInit } from '@angular/core';
import { MapService } from './map-service/map.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { DeleteEmployeeRightsComponent } from '../delete-employee-rights/delete-employee-rights.component';
import { ManipulateDeskComponent } from 'src/app/manipulate-desk/manipulate-desk.component';

@Component({
  selector: 'app-draw-office-map',
  templateUrl: './draw-office-map.component.html',
  styleUrls: ['./draw-office-map.component.scss'],
})
export class DrawOfficeMapComponent implements OnInit {
  public userRole: string = '';
  public widthSliderValue?: number;
  public heightSliderValue?: number;
  public selectedArea: any;
  public disabledSlider: boolean = true;

  constructor(
    private mapService: MapService,
    public dialog: MatDialog,
    public signInService: SignInService
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
    if (event.target && event.target.classList.value.includes('changeSize')) {
      this.disabledSlider = false;
      const eventWidth = event.target.attributes.width.value;
      const eventHeight = event.target.attributes.height.value;
      this.widthSliderValue = parseInt(eventWidth);
      this.heightSliderValue = parseInt(eventHeight);
      this.selectedArea = event;
    } else {
      this.widthSliderValue = 0;
      this.heightSliderValue = 0;
      this.selectedArea = undefined;
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

  onSetAdminTemplate() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userRole = user.role;
    const template = document.getElementById('dropzone')?.innerHTML;
    this.mapService.setUserTemplate(user, template).subscribe();
  }

  onGetUserTemplate() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.mapService.getUserTemplate(user).subscribe((res: any) => {
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

  onSetTemplate() {
    const elements = document.getElementsByTagName('rect');
    this.mapService.setOfficeParameters(elements);
    this.onSetAdminTemplate();
  }

  onBlockDesk(event: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const svg = document.getElementById('dropzone');
    if (event.target.classList.value.includes('desk')) {
      this.dialog.open(ManipulateDeskComponent, {
        autoFocus: false,
        data: {
          user: user,
          desk: event.target,
          svgCont : svg
        },
      });
    }
  }

  onDeleteEmployeeRights() {
    this.dialog.open(DeleteEmployeeRightsComponent, {
      autoFocus: false,
    });
  }
}
