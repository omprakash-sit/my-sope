import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      authorities: [],
      title: 'Login'
    }
  }, {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: 'register',
    component: UserRegistrationComponent,
    data: {
      authorities: [],
      title: 'Register'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(LOGIN_ROUTES)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
