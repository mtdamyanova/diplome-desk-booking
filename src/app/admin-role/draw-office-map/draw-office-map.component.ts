import { Component, OnInit } from '@angular/core';
import { MapService } from './map-service/map.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
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

  constructor(private mapService: MapService, public dialog: MatDialog) {}

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
    // this.mapService.setUsersTemplate(user);
  }

  onGetUserTemplate() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.mapService.getUserTemplate(user).subscribe((res: any) => {
      this.userRole = res.role;
      const svgContainer = document.getElementById('dropzone');
      const userArea = document.getElementById('userArea');
      if (svgContainer) {
        svgContainer.innerHTML = res.template;
      }
      if (userArea) {
        userArea.innerHTML = res.template;
      }
    });
  }

  test() {
    // this.mapService.addDeskInBase()
    // const a = document.getElementById('dropzone');
    // console.log(a);
    // let desks = document.getElementsByTagName('rect');
    // console.log(desks);
    // const filterDesks = Array.prototype.slice.call(desks);
    // const filtered = filterDesks.filter(
    //   (desk) => desk.classList.value !== 'area'
    // );
    // console.log(filtered);
    // filtered.forEach((desk) => console.log(desk.target));
    // const svgContainer = document.getElementById('dropzone');
  }

  onRegisterEmployees() {
    this.dialog.open(AddEmployeesComponent);
  }
}
