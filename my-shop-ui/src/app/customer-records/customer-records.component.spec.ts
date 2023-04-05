import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRecordsComponent } from './customer-records.component';

describe('CustomerRecordsComponent', () => {
  let component: CustomerRecordsComponent;
  let fixture: ComponentFixture<CustomerRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
