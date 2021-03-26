import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  constructor(private readonly httpClient: HttpClient) { }

  register(payload) {
    return this.httpClient.post('backend/register', payload);
  }

}
