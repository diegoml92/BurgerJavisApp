import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from 'ionic-angular';

import { ROLE_ADMIN, ROLE_WAITER, ROLE_KITCHEN } from '../../app/commons';
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

  login () {
    let loading = this.loadingCtrl.create({
      content: "Iniciando sesión..."
    });
    loading.present();
    var credentials = new Credentials(this.username, this.password)
    this.loginService.login(credentials)
      .then(result => {
        loading.dismiss();
        if(result != null) {
          this.auth.setCredentials (result);
          switch (this.auth.getRole()) {
            case ROLE_ADMIN:
              this.navCtrl.setRoot(SummaryComponent);
              break;
            case ROLE_WAITER:
              this.navCtrl.setRoot(OrdersComponent);
              break;
            case ROLE_KITCHEN:
              this.navCtrl.setRoot(KitchenComponent);
              break;
          }         
        } else {
          // User credentials are not correct
          let toast = this.toastCtrl.create({
            message: 'Los datos introducidos no son válidos',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.auth.resetCredentials ();
        }
      })
      .catch(error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'No se pudo iniciar sesión',
          duration: 3000,
          position: 'bottom'
        });
        this.auth.resetCredentials ();
        toast.present();
      });
  }

}