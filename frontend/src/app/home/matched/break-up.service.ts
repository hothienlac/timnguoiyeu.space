import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BreakUpService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  breakUp(email) {
    return this.httpClient.post<any>(
      'backend/remove-crush',
      {
        ...JSON.parse(sessionStorage.getItem('email-password')),
        crushEmail: email,
      }
    );
  }

}
