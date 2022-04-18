import { Component, OnInit } from '@angular/core';
import { MapService } from './map-service/map.service';

@Component({
  selector: 'app-draw-office-map',
  templateUrl: './draw-office-map.component.html',
  styleUrls: ['./draw-office-map.component.scss'],
})
export class DrawOfficeMapComponent implements OnInit {
  userRole: string = '';
  widthSliderValue: any;
  heightSliderValue: any;
  selectedArea: any;
  disabledSlider: boolean = true;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.onGetUserTemplate();
  }

  addCircle() {
    const svgCont = document.getElementById('dropzone');
    const svgns = 'http://www.w3.org/2000/svg';
    const circle = document.createElementNS(svgns, 'rect');
    circle.setAttribute('cx', '40');
    circle.setAttribute('cy', '40');
    circle.setAttribute('width', '40');
    circle.setAttribute('height', '40');
    circle.setAttribute('fill', 'green');
    circle.setAttribute('draggable', 'true');
    if (svgCont && circle) {
      svgCont.append(circle);
    }
  }

  addArea() {
    const svgCont = document.getElementById('dropzone');
    const svgns = 'http://www.w3.org/2000/svg';
    const rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('cx', '40');
    rect.setAttribute('cy', '40');
    rect.setAttribute('width', '70');
    rect.setAttribute('height', '70');
    rect.setAttribute('fill', 'white');
    rect.setAttribute('draggable', 'true');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('class', 'area');
    rect.innerHTML = 'asf';
    if (svgCont && rect) {
      svgCont.append(rect);
    }
  }

  onClick(event: any) {
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
}
