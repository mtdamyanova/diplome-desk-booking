/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrawOfficeMapComponent } from './draw-office-map.component';

describe('DrawOfficeMapComponent', () => {
  let component: DrawOfficeMapComponent;
  let fixture: ComponentFixture<DrawOfficeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawOfficeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawOfficeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
