/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RestoreEmployeeRightsComponent } from './restore-employee-rights.component';

describe('RestoreEmployeeRightsComponent', () => {
  let component: RestoreEmployeeRightsComponent;
  let fixture: ComponentFixture<RestoreEmployeeRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreEmployeeRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreEmployeeRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
