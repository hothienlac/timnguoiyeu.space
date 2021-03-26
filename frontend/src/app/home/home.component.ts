import { Component, OnInit } from '@angular/core';
import { MatchedService } from './matched.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { HostListener } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      public readonly matchedService: MatchedService,
  ) { }

  ngOnInit(): void {
    this.matchedService.updateMatched();
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
      window.sessionStorage.clear();
  }

}
