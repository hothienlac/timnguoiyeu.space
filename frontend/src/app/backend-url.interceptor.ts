import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class BackendUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url  = request.url;
    if (!url.startsWith('backend')) {
      return next.handle(request);
    }
    const duplicate = request.clone({
      url: environment.backendServer + request.url.substring(7),
    })
    return next.handle(duplicate);
  }
}
