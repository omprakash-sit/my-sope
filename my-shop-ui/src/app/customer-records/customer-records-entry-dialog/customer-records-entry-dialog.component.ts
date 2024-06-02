import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerRecords } from 'src/app/shared/models/customer-records.model';
import { MaterialsInvoiceEntry, MaterialsName } from 'src/app/shared/models/materials.model';

@Component({
  selector: 'app-customer-records-entry-dialog',
  templateUrl: './customer-records-entry-dialog.component.html',
  styleUrls: ['./customer-records-entry-dialog.component.scss']
})
export class CustomerRecordsEntryDialogComponent implements OnInit {
  customerEntryForm: UntypedFormGroup;
  materials: UntypedFormArray;
  materialsName: MaterialsName[];
  customerOwn = false;
  readonly = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: UntypedFormBuilder
  ) {
    this.customerEntryForm = this.getCustomerRecordsForm();
    this.materials = this.getMaterials();
    this.materialsName = this.getMaterialNames();
  }

  ngOnInit(): void {
    console.log(this.dialogData);
    // this.createForm();
    if (this.dialogData.data) {
      this.readonly = true;
      const data = this.dialogData.data;
      const formData = {
        name: data.name,
        date: data.purchaseDate,
        contact: data.contact,
        address: data.address,
        total: data.total,
        dues: data.dues,
        paid: data.paid,
        comments: data.comments,
        materials: [] //this.fb.array([])
      }
      if (data.materials?.length) {
        data.materials.forEach((_d: MaterialsInvoiceEntry, i: number) => {
          // (this.customerEntryForm.get('materials') as FormArray)?.insert(i, this.createMaterialForm(_d));
          (this.customerEntryForm.get('materials') as UntypedFormArray).push(this.createMaterialForm(_d));
        });
      }
      this.updateCustomerInvoiceForm(formData);
      this.customerEntryForm.get("date")?.disable();
    }
  }
  // add material row in list
  addMoreMaterial(): void {
    this.materials = this.getMaterials();
    this.materials.push(this.createMaterialForm());
  }
  // remove material row at index from list
  removeMaterial(index: number): void {
    const deleteConfirmation = confirm("Do you want to delete item ?");
    if (deleteConfirmation) {
      console.log("yes delete row");
    }
  }
  getMaterials(): UntypedFormArray {
    return this.customerEntryForm.get('materials') as UntypedFormArray;
  }
  getMaterialsControl(): UntypedFormArray {
    return (this.customerEntryForm.get('materials') as UntypedFormArray);
  }
  getMaterialsControlByIndex(index: number): any {
    const _m = (this.customerEntryForm.get('materials') as UntypedFormArray);
    return _m ? _m.at(index).value : {};
  }
  // create / update form
  getCustomerRecordsForm(): UntypedFormGroup {
    return this.fb.group({
      date: [new Date(), Validators.required],
      name: [''],
      contact: [''],
      address: [''],
      materials: this.fb.array([this.createMaterialForm()]),
      total: [0.0],
      paid: [0.0],
      dues: [0.0],
      comments: [''],
    });
  }
  createMaterialForm(data?: MaterialsInvoiceEntry): UntypedFormGroup {
    if (data) {
      return this.fb.group(data as MaterialsInvoiceEntry);
    }
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
  // calculate and update quantity price
  calcQuantityPrice(mi: number): void {
    const md = this.getMaterialsControlByIndex(mi);
    md['mqp'] = (md.q * md.p);
    const mfai = (this.customerEntryForm.get('materials') as UntypedFormArray).at(mi); // materials form array index
    mfai?.patchValue({ "mqp": md['mqp'] });
    const totalAmount = this.customerEntryForm.get('materials')?.value?.reduce((a: any, c: MaterialsInvoiceEntry) => a + c.mqp, 0);
    this.updateCustomerInvoiceForm({ "total": totalAmount });
    if (this.customerEntryForm.get('paid')?.value) {
      this.calculateDuesAmount();
    }
  }
  // calculate dues amount
  calculateDuesAmount(): void {
    const totalAmount = this.customerEntryForm.get('total')?.value;
    const paidAmount = this.customerEntryForm.get('paid')?.value;
    const dues = totalAmount - paidAmount;
    this.customerOwn = dues < 0 ? true : false;
    this.updateCustomerInvoiceForm({ "dues": dues });
  }
  // update form
  updateCustomerInvoiceForm(data: CustomerRecords): void {
    this.customerEntryForm.patchValue(data);
  }
}
