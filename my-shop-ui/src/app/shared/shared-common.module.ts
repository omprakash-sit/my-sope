import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../layout/header/header.component';
import { AngularMaterialsModule } from './angular-materials/angular-materials.module';
import { RouterModule } from '@angular/router';
import { MatListComponent } from './components/mat-list/mat-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MatListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MatListComponent,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialsModule,
  ],
})
export class SharedCommonModule { }
