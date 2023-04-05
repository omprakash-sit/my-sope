import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingRoutingModule } from './admin-routing.module';
import { SharedCommonModule } from '../shared/shared-common.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialsComponent } from './materials/materials.component';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    MaterialsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingRoutingModule,
    SharedCommonModule
  ]
})
export class AdminModule { }
