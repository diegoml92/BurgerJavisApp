import { Component } from '@angular/core';
import { NavController, NavParams, 
  LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Order } from '../../app/order';
import { OrderService } from '../../app/order.service';

@Component({
  templateUrl: 'new-order.component.html'
})

export class NewOrderComponent {

  orderName : string;
  newOrderForm : FormGroup;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.newOrderForm = this.formBuilder.group({
      name : [
        '',
        Validators.compose([
          Validators.maxLength(50), 
          Validators.pattern('[a-zA-ZñÑ0-9][a-zA-ZñÑ 0-9]*'),
          Validators.required
        ]),
        this.orderValidation.bind(this)
      ]
    });
  }

  orderValidation(formControl: FormControl): Promise<any> {
    return this.orderService.checkOrderName(formControl.value);
  }
  
  onSubmit () {
    let order = new Order(this.orderName);
    let loading = this.loadingCtrl.create({
      content: "Creando pedido..."
    });
    loading.present();
    this.orderService.addOrder(order)
      .then(() => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      })
      .catch(() => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al crear el pedido',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

}