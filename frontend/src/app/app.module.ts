/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule as ngFormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import { RegisterVerifyEmailComponent } from './register-verify-email/register-verify-email.component';
import { SigninComponent } from './signin/signin.component';
import { SigninService } from './signin/signin.service';
import { RegisterService } from './register/register.service';
import { BackendUrlInterceptor } from './backend-url.interceptor';
import { MatchedComponent } from './home/matched/matched.component';
import { CrushComponent } from './home/crush/crush.component';
import { RegisterVerifyEmailService } from './register-verify-email/register-verify-email.service';
import { MatchedService } from './home/matched.service';
import { HomeComponent } from './home/home.component';
import { BreakUpService } from './home/matched/break-up.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UncrushComponent } from './home/crush/uncrush/uncrush.component';
import { CrushService } from './home/crush/crush.service';
import { NewCrushComponent } from './home/crush/new-crush/new-crush.component';
import { BreakupComponent } from './home/matched/breakup/breakup.component';
import { AppComponent } from './app.component';
import { ThemeModule } from './@theme/theme.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterVerifyEmailComponent,
    SigninComponent,
    HomeComponent,
    MatchedComponent,
    CrushComponent,
    UncrushComponent,
    NewCrushComponent,
    BreakupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    ngFormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
  ],
  providers: [
    SigninService,
    RegisterService,
    RegisterVerifyEmailService,
    MatchedService,
    BreakUpService,
    CrushService,
    { provide: HTTP_INTERCEPTORS, useClass: BackendUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
