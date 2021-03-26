import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SigninService } from './signin.service';

@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');
  spin = false;

  constructor(
    private readonly signinService: SigninService,
    private readonly toastrService: NbToastrService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  signin(): void {
    this.spin = true;
    this.signinService.signin({
      email: this.email.value,
      password: this.password.value,
    }).subscribe(
      (respond: {message: String}) => {
        this.spin = false;
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
        sessionStorage.setItem('email-password', JSON.stringify({
          email: this.email.value,
          password: this.password.value,
        }));
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.spin = false;
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
