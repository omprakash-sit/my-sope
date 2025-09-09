import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataCommunicationService } from '../shared/services';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  loginError = "";
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService,
    private dcs: DataCommunicationService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
  }
  newUser(): void {
    this.router.navigate(['/register']);
  }
  submitForm(): void {
    console.table(this.loginForm.value);
    this.loginService.getAuthenticate(this.loginForm.value).then((data: HttpResponse<any>) => {
      const response = data.body ?? null;
      this.loginError = "";
      if (response) {
        this.dcs.setStorage('loggedInfo', response);
        if (this.loginForm.value.rememberMe) {
          this.dcs.setStorage('loggedInfo', response, 'local');
        }
        if (response['role'] === 'admin') {
          this.router.navigate(['admin']);
        } else if (response['role'] === 'user') {
          this.router.navigate(['user']);
        }
      } else {
        this.loginService.logout();
      }
    }).catch((error: any) => {
      this.loginError = error.error?.message;
      console.log(error);
    })
    // if (this.loginForm.value.isAdmin) {
    //   this.router.navigate(['admin/dashboard']);
    // }
  }

  // logout
  logout(): void {
    this.loginService.logout();
  }
}
