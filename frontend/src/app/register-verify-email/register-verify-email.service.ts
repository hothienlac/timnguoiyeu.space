import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterVerifyEmailService {

  constructor(private readonly httpClient: HttpClient) { }

  verify(payload): Observable<any> {
    return this.httpClient.post('backend/register-verify-email', payload);
  }

}
