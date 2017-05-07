import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController,
  NavParams, NavController } from 'ionic-angular';
import { Credentials } from '../../app/credentials';
import { LoginService } from '../../app/login.service';
import { OrdersComponent } from '../orders/orders.component';
import { AuthenticationManager } from '../../app/authentication-manager';

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
		public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loginService: LoginService)
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
      .then(error => {
        loading.dismiss();
        if(error != null) {
          // User credentials are not correct
          let toast = this.toastCtrl.create({
            message: 'Los datos introducidos no son válidos',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        } else {
          AuthenticationManager.setCredentials (credentials);
          this.navCtrl.setRoot(OrdersComponent);
        }
      })
      .catch(error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'No se pudo iniciar sesión',
          duration: 3000,
          position: 'bottom'
        });
        AuthenticationManager.resetCredentials ();
        toast.present();
      });
  }

}