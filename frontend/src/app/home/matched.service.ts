import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of } from 'rxjs';

@Injectable()
export class MatchedService {

  public matched: string = '0';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly toastrService: NbToastrService,
  ) { }

  getMatched() {
    // return of<any>({matched: 'Jena'})
    return this.httpClient.post<any>(
      'backend/get-matched',
      JSON.parse(sessionStorage.getItem('email-password')),
    );
  }

  updateMatched() {
    this.getMatched().subscribe(
      (respond) => {
        this.matched = respond.matched
      },
      (error) => {
        this.toastrService.show(
          error.error.message || error.error.code || error,
          'Error',
          {
            status: 'danger',
            destroyByClick: true,
            duration: 10000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          }
        );
      },
    );
  }

}
