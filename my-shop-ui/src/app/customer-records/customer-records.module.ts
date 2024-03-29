import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRecordsComponent } from './customer-records.component';
import { CustomerRecordsEntryDialogComponent } from './customer-records-entry-dialog/customer-records-entry-dialog.component';
import { SharedCommonModule } from '../shared/shared-common.module';
import { CustomerRecordsService } from './customer-records.service';



@NgModule({
  declarations: [
    CustomerRecordsComponent,
    CustomerRecordsEntryDialogComponent
  ],
  imports: [
    CommonModule,
    SharedCommonModule
  ],
  providers: [CustomerRecordsService]
})
export class CustomerRecordsModule { }
