import { TestBed } from '@angular/core/testing';

import { CrushService } from './crush.service';

describe('CrushService', () => {
  let service: CrushService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrushService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
