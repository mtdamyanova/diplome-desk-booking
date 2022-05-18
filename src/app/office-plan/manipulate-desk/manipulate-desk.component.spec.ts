/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDeskComponent } from './manipulate-desk.component';


describe('ManipulateDeskComponent', () => {
  let component: ManipulateDeskComponent;
  let fixture: ComponentFixture<ManipulateDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManipulateDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
