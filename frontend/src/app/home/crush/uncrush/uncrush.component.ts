import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-uncrush',
  templateUrl: './uncrush.component.html',
  styleUrls: ['./uncrush.component.scss']
})
export class UncrushComponent {

  @Input() email: string;

  constructor(protected ref: NbDialogRef<UncrushComponent>) {}

  cancel() {
    this.ref.close(false);
  }

  sure() {
    this.ref.close(true);
  }

}
