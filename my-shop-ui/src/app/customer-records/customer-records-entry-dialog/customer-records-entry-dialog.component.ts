import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialsInvoiceEntry, MaterialsName } from 'src/app/shared/models/materials.model';

@Component({
  selector: 'app-customer-records-entry-dialog',
  templateUrl: './customer-records-entry-dialog.component.html',
  styleUrls: ['./customer-records-entry-dialog.component.scss']
})
export class CustomerRecordsEntryDialogComponent implements OnInit {
  customerEntryForm: FormGroup;
  materials: FormArray;
  materialsName: MaterialsName[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder
  ) {
    this.customerEntryForm = this.getCustomerRecordsForm();
    this.materials = this.getMaterials();
    this.materialsName = this.getMaterialNames();
  }

  ngOnInit(): void {
    console.log(this.dialogData);
    // this.createForm();
    // json sample
    let customerData = {
      "date": "",
      "name": "",
      "contact": "",
      "address": "",
      "m1": "",
      "m2": "",
      "m3": "",
      "m4": "",
      "m5": "",
      "m6": "",
      "m7": "",
      "m8": "",
      "m9": "",
      "m10": "",
      "m1q": 0.0,
      "m2q": 0.0,
      "m3q": 0.0,
      "m4q": 0.0,
      "m5q": 0.0,
      "m6q": 0.0,
      "m7q": 0.0,
      "m8q": 0.0,
      "m9q": 0.0,
      "m10q": 0.0,
      "m1p": 0,
      "m2p": 0,
      "m3p": 0,
      "m4p": 0,
      "m5p": 0,
      "m6p": 0,
      "m7p": 0,
      "m8p": 0,
      "m9p": 0,
      "m10p": 0,
      "m1qp": 0.0,
      "m2qp": 0.0,
      "m3qp": 0.0,
      "m4qp": 0.0,
      "m5qp": 0.0,
      "m6qp": 0.0,
      "m7qp": 0.0,
      "m8qp": 0.0,
      "m9qp": 0.0,
      "m10qp": 0.0,
      "total": 0.0,
      "paid": "",
      "dues": "",
      "comments": "",
      "descriptions": ""
    }
  }
  addMoreMaterial(): void {
    this.materials = this.getMaterials();
    this.materials.push(this.createMaterialForm());
  }
  getMaterials(): FormArray {
    return this.customerEntryForm.get('materials') as FormArray;
  }
  getMaterialsControl(): FormArray {
    return (this.customerEntryForm.get('materials') as FormArray);
  }
  // create / update form
  getCustomerRecordsForm(): FormGroup {
    return this.fb.group({
      date: [new Date(), Validators.required],
      name: [''],
      contact: [''],
      address: [''],
      materials: this.fb.array([this.createMaterialForm()]),
      total: [0],
      paid: [0],
      dues: [0],
      comments: [''],
      descriptions: ['']
    });
  }
  createMaterialForm(): FormGroup {
    return this.fb.group({
      m: '',
      q: 0.0,
      p: 0.0,
      mqp: 0.0
    } as MaterialsInvoiceEntry);
  }

  // material names
  getMaterialNames(): MaterialsName[] {
    return [{
      id: 'C1',
      name: 'Cement',
      grade: 'NA',
      brand: 'NA',
    }, {
      id: 'C2',
      name: 'Cement',
      grade: 'A',
      brand: 'konark',
    }, {
      id: 'C3',
      name: 'Cement',
      grade: 'A',
      brand: 'prism',
    }, {
      id: 'C4',
      name: 'Cement',
      grade: 'A',
      brand: 'birla power',
    }, {
      id: 'C5',
      name: 'Cement',
      grade: 'A',
      brand: 'champion',
    }, {
      id: 'SD1',
      name: 'Sand',
      grade: '',
      brand: '',
    }, {
      id: 'ST1',
      name: 'Stone',
      grade: '',
      brand: '',
    }, {
      id: 'ST2',
      name: 'Stone',
      grade: '',
      brand: 'chip',
    }, {
      id: 'R1',
      name: 'Rod',
      grade: '',
      brand: '',
    }, {
      id: 'R2',
      name: 'Ring',
      grade: '',
      brand: '',
    },]
  }
}
