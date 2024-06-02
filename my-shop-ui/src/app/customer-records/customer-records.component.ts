import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerRecordsEntryDialogComponent } from './customer-records-entry-dialog/customer-records-entry-dialog.component';
import { CustomerRecords } from '../shared/models/customer-records.model';
import { CustomerRecordsService } from './customer-records.service';
import { HttpResponse } from '@angular/common/http';
import { DataUtilityService } from '../shared/services/data-utility.service';

@Component({
  selector: 'app-customer-records',
  templateUrl: './customer-records.component.html',
  styleUrls: ['./customer-records.component.scss']
})
export class CustomerRecordsComponent implements OnInit {
  customerRecords: CustomerRecords[] = [];
  constructor(
    private dialog: MatDialog,
    private customerRecordsService: CustomerRecordsService,
    private dus: DataUtilityService
  ) { }

  ngOnInit(): void {
    this.getAllCustomerRecords();
  }

  // get all customer records
  getAllCustomerRecords(): void {
    this.customerRecordsService.getCustomerRecords().subscribe((res: HttpResponse<CustomerRecords[]>) => {
      this.customerRecords = res.body ?? [];
    })
  }
  addRecords(data?: CustomerRecords): void {
    const title = data ? 'Update Customer Invoice' : 'Create Customer Invoice';
    const dialogRef = this.dialog.open(CustomerRecordsEntryDialogComponent, {
      width: '70%',
      height: '85%',
      data: { title, data: data }
    });
    dialogRef.afterClosed().subscribe(formData => {
      console.log(formData);
      if (formData) {
        if (data) {
          // call api for save
          if (data.customerId) {
            const customerMaterials = this.getFormatedMaterials(formData['materials']);
            delete formData['materials'];
            const req = { ...formData, ...customerMaterials };
            req['date'] = this.dus.formatedDate(req.date ?? data.purchaseDate, 'sql');
            console.log(req);
            this.customerRecordsService.updateCustomerRecords(data.customerId, req).subscribe((res: HttpResponse<any>) => {
              alert(res.body.message);
              this.getAllCustomerRecords();
              // check datetime type in db.sql
            });
          } else {
            alert("customer id not correct !");
          }
        } else {
          // create new records
          const customerInfo = {
            name: formData.name,
            contact: formData.contact ? formData.contact : null,
            address: formData.address,
            date: this.dus.formatedDate(formData.date, 'sql'),
            comments: formData.comments,
            // descriptions: formData.descriptions,
            total: formData.total,
            paid: formData.paid,
            dues: formData.dues
          }
          const customerMaterials = this.getFormatedMaterials(formData['materials']);
          const req = { ...customerInfo, ...customerMaterials };
          console.log(req);
          this.customerRecordsService.createCustomerRecords(req).subscribe((res: HttpResponse<any>) => {
            alert(res.body.message);
            this.getAllCustomerRecords();
            // check datetime type in db.sql
          });
        }
      }
    });
  }

  // format nested materials into flat object
  getFormatedMaterials(materials: any[]): any {
    const fm: any = {};
    for (let i = 0; i < materials.length; i++) {
      fm['m' + (i + 1)] = materials[i].m;
      fm['q' + (i + 1)] = materials[i].q;
      fm['p' + (i + 1)] = materials[i].p;
      // fm['m' + (i + 1) + 'qp'] = materials[i].mqp;
    }
    return fm;
  }
}
