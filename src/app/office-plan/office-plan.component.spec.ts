/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfficePlanComponent } from './office-plan.component';

describe('OfficePlanComponent', () => {
  let component: OfficePlanComponent;
  let fixture: ComponentFixture<OfficePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
