import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from '../core/config/authority.constant';
import { CustomerRecordsComponent } from '../customer-records/customer-records.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialsComponent } from './materials/materials.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      authorities: [Authority.ADMIN],
      title: 'Admin'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          authorities: [Authority.ADMIN],
          title: 'Dashboard'
        }
      },
      {
        path: 'materials',
        component: MaterialsComponent,
        data: {
          authorities: [Authority.ADMIN],
          title: 'Materials'
        },
        // loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule),
      },
      {
        path: 'customer-records',
        component: CustomerRecordsComponent,
        data: {
          authorities: [Authority.ADMIN],
          title: 'Customer Records'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingRoutingModule { }
