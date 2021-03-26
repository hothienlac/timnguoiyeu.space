import { TestBed } from '@angular/core/testing';

import { BackendUrlInterceptor } from './backend-url.interceptor';

describe('BackendUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BackendUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BackendUrlInterceptor = TestBed.inject(BackendUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
