/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfficePlanService } from './office-plan.service';

describe('Service: OfficePlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficePlanService]
    });
  });

  it('should ...', inject([OfficePlanService], (service: OfficePlanService) => {
    expect(service).toBeTruthy();
  }));
});
