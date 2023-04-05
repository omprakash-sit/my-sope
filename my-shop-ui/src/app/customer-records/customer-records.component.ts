import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerRecordsEntryDialogComponent } from './customer-records-entry-dialog/customer-records-entry-dialog.component';
import { CustomerRecords } from '../shared/models/customer-records.model';

@Component({
  selector: 'app-customer-records',
  templateUrl: './customer-records.component.html',
  styleUrls: ['./customer-records.component.scss']
})
export class CustomerRecordsComponent implements OnInit {
  customerRecords: CustomerRecords[] = [];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addRecords(data?: CustomerRecords): void {
    const dialogRef = this.dialog.open(CustomerRecordsEntryDialogComponent, {
      width: '70%',
      height: '85%',
      data: { title: 'Customer Records Entry', data: data }
    });
    dialogRef.afterClosed().subscribe(formData => {
      console.log(formData);
      if (data) {
        // call api for save
      } else {
        // create new records
        this.customerRecords.push(formData); // temp, call api instead
      }
    });
  }
}
