import { Component, OnInit } from '@angular/core';
import { ANGULAR_VERSION } from 'src/app/app.constants';
import { LoginService } from 'src/app/login/login.service';
import { LoggedUser } from 'src/app/shared/models';
import { DataCommunicationService } from 'src/app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  version: string;
  loggedUserInfo: LoggedUser;
  displayName: string = '';
  constructor(
    private dcs: DataCommunicationService,
    private loginService: LoginService) {
    this.version = (ANGULAR_VERSION).full;
    this.loggedUserInfo = this.dcs.getStorage('loggedInfo');
  }

  ngOnInit(): void {
    this.displayName = this.getSN(this.loggedUserInfo.name);
  }

  // short name for first & last name
  getSN(fullName: string): string {
    let sn = '';
    if (fullName && fullName !== '') {
      const names = fullName.split(' ');
      if (names.length) {
        console.log(names);
        sn = names.length > 1 ? names[0].charAt(0) + names[1].charAt(0) : names[0].charAt(0);
        return sn.toUpperCase();
      }
      return sn;
    } else {
      return (sn = String(this.loggedUserInfo.email.charAt(0).toUpperCase()));
    }
  }

  // logout
  logout(): void {
    this.loginService.logout();
  }
}
