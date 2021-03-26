import { TestBed } from '@angular/core/testing';

import { NotSignedInGuard } from './not-signed-in.guard';

describe('NotSignedInGuard', () => {
  let guard: NotSignedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotSignedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
