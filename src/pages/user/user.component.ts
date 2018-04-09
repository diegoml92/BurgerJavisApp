import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ROLE_ADMIN, ROLE_WAITER, ROLE_KITCHEN } from '../../app/commons';
import { LoginComponent } from '../login/login.component';
import { AuthenticationManager } from '../../providers/authentication-manager';

@Component({
  templateUrl: 'user.component.html',
})
export class UserComponent {

  constructor(
    private navCtrl: NavController,
    private auth: AuthenticationManager) {}

  logOut() {
    this.auth.resetCredentials();
    this.navCtrl.push(LoginComponent);
  }

  getUsername(): string {
    return this.auth.getCredentials().username;
  }

  getRole(): string {
    var role: string;
    switch (this.auth.getCredentials().roles[0]) {
      case ROLE_ADMIN:
        role = "ADMINISTRADOR"
        break;
      case ROLE_WAITER:
        role = "CAMARERO";
        break;
      case ROLE_KITCHEN:
        role = "COCINA";
        break;
    }
    return role;
  }

}