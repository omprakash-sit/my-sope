import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: [false]
    });
  }

  ngOnInit(): void {
  }
  newUser(): void {
    this.router.navigate(['/register']);
  }
  submitForm(): void {
    console.table(this.loginForm.value);
    if (this.loginForm.value.isAdmin) {
      this.router.navigate(['admin/dashboard']);
    }
  }
}
