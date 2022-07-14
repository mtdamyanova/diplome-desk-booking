import { Component, OnInit } from '@angular/core';
import { MapService } from './map-service/map.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { DeleteEmployeeRightsComponent } from '../delete-employee-rights/delete-employee-rights.component';
import { tap } from 'rxjs';
import { RestoreEmployeeRightsComponent } from '../restore-employee-rights/restore-employee-rights.component';
import {
  faUserMinus,
  faUserCheck,
  faLocationPinLock,
  faLocation,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
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
  public removeUser = faUserMinus;
  public restoreUser = faUserCheck;
  public faLocationLock = faLocationPinLock;
  public faLocation = faLocation;
  public faTrash = faTrash;
  public disableBlockOrUnblockDesk = true;

  constructor(
    private mapService: MapService,
    public dialog: MatDialog,
    public signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.onGetAdminMap().subscribe();
  }

  onAddDesk() {
    this.mapService.addDesk();
  }

  onAddArea() {
    this.mapService.addArea();
  }

  onResizeAreaOrDesk(event: any) {
    if (
      this.selectedArea &&
      this.selectedArea.target.classList.value.includes('desk')
    ) {
      this.selectedArea?.target.setAttribute('stroke', '');
    } else {
      this.selectedArea?.target.setAttribute('stroke', '#cdd2e4');
    }
    if (event.target && event.target.classList.value.includes('changeSize')) {
      this.selectedArea = event;
      this.disabledSlider = false;
      const eventWidth = event.target.attributes.width.value;
      const eventHeight = event.target.attributes.height.value;
      this.widthSliderValue = parseInt(eventWidth);
      this.heightSliderValue = parseInt(eventHeight);
      this.selectedArea.target.setAttribute('stroke', '#718a49');
    } else {
      this.disabledSlider = true;
      this.widthSliderValue = 0;
      this.heightSliderValue = 0;
      this.selectedArea = undefined;
    }

    if (event.target.classList.value.includes('desk')) {
      this.disableBlockOrUnblockDesk = false;
    } else {
      this.disableBlockOrUnblockDesk = true;
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
    return this.mapService.setUserTemplate(user, template);
  }

  onGetAdminMap() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return this.mapService.getUserTemplate(user).pipe(
      tap((res: any) => (this.userRole = res.role)),
      tap((res: any) => {
        const svg = document.getElementById('dropzone');
        svg ? (svg.innerHTML = res.template) : '';
      })
    );
  }

  onRegisterEmployees() {
    this.dialog.open(AddEmployeesComponent);
  }

  onSetTemplate() {
    const elements = document.getElementsByTagName('rect');
    this.mapService.setOfficeParameters(elements);
    this.onSetAdminTemplate().subscribe();
  }

  onDeleteEmployeeRights() {
    this.dialog.open(DeleteEmployeeRightsComponent, {
      autoFocus: false,
    });
  }

  onRestoreEmployeeRights() {
    this.dialog.open(RestoreEmployeeRightsComponent, {
      autoFocus: false,
    });
  }

  onBlockDesk() {
    this.selectedArea.target.setAttribute('fill', '#d9dae1');
    this.disableBlockOrUnblockDesk = true;
  }

  onUblockDesk() {
    this.selectedArea.target.setAttribute('fill', '#d6ebb5');
    this.disableBlockOrUnblockDesk = true;
  }

  onChangeSelectedStatus(event: any) {
    if (
      event && event?.target &&
      !event.target.classList.value.includes('changeSize') &&
      this.selectedArea.target.classList.value.includes('desk')
    ) {
      this.selectedArea.target.setAttribute('stroke', '');
      this.disabledSlider = true;
    }
    if (
      event.target &&
      !event.target.classList.value.includes('changeSize') &&
      this.selectedArea.target.classList.value.includes('area')
    ) {
      this.selectedArea.target.setAttribute('stroke', '#cdd2e4');
      this.disabledSlider = true;
    }
  }

  onRemoveDeskOrArea() {
    const svgContainer = document.getElementById('dropzone');
    if (svgContainer && this.selectedArea) {
      svgContainer.removeChild(this.selectedArea.target);
      this.disableBlockOrUnblockDesk = true;
    }
  }
}
