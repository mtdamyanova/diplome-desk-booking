/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookDeskService } from './book-desk.service';

describe('Service: BookDesk', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookDeskService]
    });
  });

  it('should ...', inject([BookDeskService], (service: BookDeskService) => {
    expect(service).toBeTruthy();
  }));
});
