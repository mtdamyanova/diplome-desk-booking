import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficePlanService } from '../office-plan-service/office-plan.service';

@Component({
  selector: 'app-block-desk',
  templateUrl: './block-desk.component.html',
  styleUrls: ['./block-desk.component.scss'],
})
export class BlockDeskComponent implements OnInit {
  public desk: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private officePlanService: OfficePlanService,
    private matDialogRef: MatDialogRef<BlockDeskComponent>
  ) {}

  ngOnInit() {}

  onBookDesk() {
    this.officePlanService.changeDeskStatus(this.data.currentDesk, 'blocked');
    this.matDialogRef.close();
  }

  onBlockDesk(){
    
  }
}
