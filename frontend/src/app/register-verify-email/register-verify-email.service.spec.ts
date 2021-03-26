import { TestBed } from '@angular/core/testing';

import { RegisterVerifyEmailService } from './register-verify-email.service';

describe('RegisterVerifyEmailService', () => {
  let service: RegisterVerifyEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterVerifyEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
