import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { MenuController } from 'ionic-angular';

import { BASIC_PREFIX, JSON_HEADER_NAME, JSON_HEADER_VALUE } from './commons';
import { Credentials } from './credentials';
import { ROLE_ADMIN, ROLE_WAITER } from './commons';

@Injectable()
export class AuthenticationManager {

  private credentials : Credentials;

  constructor(private menuCtrl: MenuController) {}

  private enableSideMenu(roles: string []) {
    if(roles.indexOf(ROLE_ADMIN) >= 0) {
      this.menuCtrl.enable(true, "adminMenu");
    } else if(roles.indexOf(ROLE_WAITER) >= 0) {
      this.menuCtrl.enable(true, "waiterMenu")
    } else {
      this.menuCtrl.enable(true, "");
    }
  }

  setCredentials(credentials: Credentials) {
    this.credentials = credentials;
    this.enableSideMenu(credentials.roles);
  }

  resetCredentials() {
    this.credentials = new Credentials();
  }

  getCredentials(): Credentials {
    return this.credentials;
  }

  generateAuthHeader(): Headers {
    var ascii = this.credentials.username + ":" + this.credentials.password;
  	return new Headers({'Authorization': BASIC_PREFIX + new Buffer(ascii).toString('base64')});
  }

  generateJsonAuthHeader(): Headers {
    var ascii = this.credentials.username + ":" + this.credentials.password;
    var headers = new Headers();
    headers.append(JSON_HEADER_NAME, JSON_HEADER_VALUE);
    headers.append('Authorization', BASIC_PREFIX + new Buffer(ascii).toString('base64'))
    return headers;
  }

  isAdmin(): boolean {
    return this.credentials.roles.indexOf(ROLE_ADMIN) >= 0;
  }

}