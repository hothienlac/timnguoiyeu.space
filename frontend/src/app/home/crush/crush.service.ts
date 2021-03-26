import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CrushService {

  constructor(private readonly httpClient: HttpClient) { }

  uncrush(email) {
    return this.httpClient.post<any>(
      'backend/remove-crush',
      {
        ...JSON.parse(sessionStorage.getItem('email-password')),
        crushEmail: email,
      }
    );
  }

  newCrush(email) {
    return this.httpClient.post<any>(
      'backend/new-crush',
      {
        ...JSON.parse(sessionStorage.getItem('email-password')),
        crushEmail: email,
      }
    );
  }

  getCrushes() {
    return this.httpClient.post<any>(
      'backend/get-crushes',
      JSON.parse(sessionStorage.getItem('email-password'))
    );
  }

}
