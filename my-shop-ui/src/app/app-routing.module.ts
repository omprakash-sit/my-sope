import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from './core/config/authority.constant';
import { errorRoute } from './layout/error/error.route';
import { LOGIN_ROUTES } from './login/login-routing.module';


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'admin',
      data: {
        authorities: [Authority.ADMIN]
      },
      loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingRoutingModule),
    },
    ...LOGIN_ROUTES,
    ...errorRoute
  ], { enableTracing: true, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
