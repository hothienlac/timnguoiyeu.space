import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RegisterVerifyEmailComponent } from './register-verify-email/register-verify-email.component';
import { SigninComponent } from './signin/signin.component';
import { NotSignedInGuard } from './not-signed-in.guard';
import { SignedInGuard } from './signed-in.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'register',
    canActivate: [NotSignedInGuard],
    component: RegisterComponent,
  },
  {
    path: 'register-verify-email',
    canActivate: [NotSignedInGuard],
    component: RegisterVerifyEmailComponent,
  },
  {
    path: 'signin',
    canActivate: [NotSignedInGuard],
    component: SigninComponent,
  },
  {
    path: '',
    canActivate: [SignedInGuard],
    component: HomeComponent,
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
        .then(m => m.PagesModule),
  },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
