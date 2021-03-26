import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MatchedService } from '../matched.service';
import { BreakUpService } from './break-up.service';
import { BreakupComponent } from './breakup/breakup.component';

@Component({
  selector: 'ngx-matched',
  templateUrl: './matched.component.html',
  styleUrls: ['./matched.component.scss']
})
export class MatchedComponent implements OnInit {

  spin: boolean = false;

  constructor(
    private readonly breakUpService: BreakUpService,
    private readonly dialogService: NbDialogService,
    private readonly toastrService: NbToastrService,
    public readonly matchedService: MatchedService,
) { }

  ngOnInit(): void {
  }

  breakUp(): void {
    this.dialogService.open(
      BreakupComponent,
      {
        context: { email: this.matchedService.matched },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      }
    ).onClose.subscribe(confirmed => {
      confirmed && this.breakUpService.breakUp(this.matchedService.matched).subscribe(
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
    });
  }

}
