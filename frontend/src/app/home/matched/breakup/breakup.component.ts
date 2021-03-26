import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-breakup',
  templateUrl: './breakup.component.html',
  styleUrls: ['./breakup.component.scss']
})
export class BreakupComponent {

  @Input() email: string;

  constructor(protected ref: NbDialogRef<BreakupComponent>) {}

  cancel() {
    this.ref.close(false);
  }

  sure() {
    this.ref.close(true);
  }

}
