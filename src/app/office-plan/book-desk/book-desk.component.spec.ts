/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeskComponent } from './book-desk.component';

describe('BookDeskComponent', () => {
  let component: BookDeskComponent;
  let fixture: ComponentFixture<BookDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
