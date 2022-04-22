/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UnbookDeskComponent } from './unbook-desk.component';

describe('UnbookDeskComponent', () => {
  let component: UnbookDeskComponent;
  let fixture: ComponentFixture<UnbookDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnbookDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbookDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
