import { TestBed } from '@angular/core/testing';

import { BreakUpService } from './break-up.service';

describe('BreakUpService', () => {
  let service: BreakUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
