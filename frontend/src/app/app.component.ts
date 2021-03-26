/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app',
  template: `
  <nb-layout windowMode>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>
  `,
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
