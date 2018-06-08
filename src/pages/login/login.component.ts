import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from 'ionic-angular';

import { ROLE_ADMIN, ROLE_WAITER, ROLE_KITCHEN } from '../../app/commons';
import { Util } from '../../app/util';
import { Credentials } from '../../app/credentials';
import { LoginService } from '../../providers/login.service';
import { AuthenticationManager } from '../../providers/authentication-manager';

import { OrdersComponent } from '../../pages/orders/orders.component';
import { SummaryComponent } from '../../pages/summary/summary.component';
import { KitchenComponent } from '../../pages/kitchen/kitchen.component';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  username: string;
  password: string;

	constructor(public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public auth: AuthenticationManager)
  {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.maxLength(50), 
          Validators.pattern('[a-zA-ZñÑ0-9]*'),
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.minLength(1)
      ]
    });
  }

  private processLoginResult(result) {
    console.debug(JSON.stringify(result));
    if(result != null) {
      this.auth.setCredentials (result);
      switch (this.auth.getRole()) {
        case ROLE_ADMIN:
          console.debug('SummaryComponent');
          this.navCtrl.setRoot(SummaryComponent);
          break;
        case ROLE_WAITER:
          console.debug('OrdersComponent');
          this.navCtrl.setRoot(OrdersComponent);
          break;
        case ROLE_KITCHEN:
          console.debug('KitchenComponent');
          this.navCtrl.setRoot(KitchenComponent);
          break;
      }         
    } else {
      // User credentials are not correct
      let toast = this.toastCtrl.create
          (Util.getToastParams('Los datos introducidos no son válidos'));
      toast.present();
      this.auth.resetCredentials ();
    }
  }

  login () {
    let loading = this.loadingCtrl.create({
      content: "Iniciando sesión..."
    });
    loading.present();
    var credentials = new Credentials(this.username, this.password)
    this.loginService.login(credentials)
      .then(result => {
        loading.dismiss();
        this.processLoginResult(result);
      })
      .catch(error => {
        loading.dismiss();
        let toast = this.toastCtrl.create(Util.getToastParams('No se pudo iniciar sesión'));
        this.auth.resetCredentials ();
        toast.present();
      });
  }

}