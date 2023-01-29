import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from './config/authority.constant';


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'admin/dashboard',
      data: {
        authorities: [Authority.ADMIN]
      },
      loadChildren: () => import('./admin/admin-routing-routing.module').then(m => m.AdminRoutingRoutingModule),
    }
  ], { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
