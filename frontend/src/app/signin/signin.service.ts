import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SigninService {

  constructor(private readonly httpClient: HttpClient) { }

  signin(payload) {
    return this.httpClient.post('backend/check-password', payload);
  }

}
