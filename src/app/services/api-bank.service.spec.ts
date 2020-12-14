import { TestBed } from '@angular/core/testing';

import { ApiBankService } from './api-bank.service';

describe('ApiBankService', () => {
  let service: ApiBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
