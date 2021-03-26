import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MatchedService } from '../../matched.service';
import { CrushService } from '../crush.service';

@Component({
  selector: 'ngx-new-crush',
  templateUrl: './new-crush.component.html',
  styleUrls: ['./new-crush.component.scss']
})
export class NewCrushComponent {

  constructor(
    private readonly crushService: CrushService,
    protected ref: NbDialogRef<NewCrushComponent>,
    private readonly toastrService: NbToastrService,
    private readonly matchedService: MatchedService,
  ) {}

  cancel() {
    this.ref.close();
  }

  crush(email) {
    this.crushService.newCrush(email).subscribe(
      (respond: {message: String}) => {
        this.toastrService.show(
          respond.message,
          'Success',
          {
            status: 'success',
            destroyByClick: true,
            duration: 5000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          }
        );
        this.matchedService.updateMatched();
        this.ref.close();
      },
      (error: HttpErrorResponse) => {
        this.toastrService.show(
          error.error.message || error.error.code || error,
          'Error',
          {
            status: 'danger',
            destroyByClick: true,
            duration: 5000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          }
        );
      },
    );
  }

}
