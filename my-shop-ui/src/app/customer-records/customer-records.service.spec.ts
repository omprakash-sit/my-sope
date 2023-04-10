import { TestBed } from '@angular/core/testing';

import { CustomerRecordsService } from './customer-records.service';

describe('CustomerRecordsService', () => {
  let service: CustomerRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
