import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { RegisterService } from './register.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');
  spin = false;

  constructor(
    private readonly registerService: RegisterService,
    private readonly toastrService: NbToastrService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.spin = true;
    this.registerService.register({
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
        this.router.navigate(['/signin']);
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
