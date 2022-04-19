import { Component, OnInit } from '@angular/core';
import { MapService } from '../admin-role/draw-office-map/map-service/map.service';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.scss'],
})
export class EmployeeRoleComponent implements OnInit {
  userRole: string = '';
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.onGetUserTemplate();
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

  onClick(e:Event){
    console.log(e.target);
    
  }
}
