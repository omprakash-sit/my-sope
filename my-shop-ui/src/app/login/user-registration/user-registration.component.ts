import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  newUserForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      phoneCode: ['+91'],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [''],
      password: ['', Validators.required],
      isAdmin: [false]
    });
  }

  checkValidForm(): boolean {
    return this.newUserForm.invalid;
  }
  submitForm(): void {
    if (!this.checkValidForm()) {
      console.log(this.newUserForm.value);
    }

  }

}
