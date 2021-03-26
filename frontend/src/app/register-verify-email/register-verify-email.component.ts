import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { RegisterVerifyEmailService } from './register-verify-email.service';

@Component({
  selector: 'ngx-register-verify-email',
  templateUrl: './register-verify-email.component.html',
  styleUrls: ['./register-verify-email.component.scss']
})
export class RegisterVerifyEmailComponent implements OnInit {

  token: string;
  password = new FormControl('');
  spin = false;

  constructor(
    private readonly registerVerifyEmail: RegisterVerifyEmailService,
    private readonly toastrService: NbToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  verify(): void {
    this.spin = true;
    this.registerVerifyEmail.verify({
      password: this.password.value,
      token: this.token,
    }).subscribe(
      respond => {
        this.spin = false;
        this.toastrService.show(
          respond.message,
          'Your Account Has Been Created!',
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
      error => {
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
      }
    )
  }

}
