/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddEmployeesService } from './add-employees.service';

describe('Service: AddEmployees', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddEmployeesService]
    });
  });

  it('should ...', inject([AddEmployeesService], (service: AddEmployeesService) => {
    expect(service).toBeTruthy();
  }));
});
