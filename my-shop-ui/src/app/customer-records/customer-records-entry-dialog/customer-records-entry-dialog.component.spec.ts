import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRecordsEntryDialogComponent } from './customer-records-entry-dialog.component';

describe('CustomerRecordsEntryDialogComponent', () => {
  let component: CustomerRecordsEntryDialogComponent;
  let fixture: ComponentFixture<CustomerRecordsEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRecordsEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRecordsEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
