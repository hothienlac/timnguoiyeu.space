import { TestBed } from '@angular/core/testing';

import { MatchedService } from './matched.service';

describe('CrushService', () => {
  let service: MatchedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
