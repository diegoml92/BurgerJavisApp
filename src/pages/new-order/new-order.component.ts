import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        ])      ]
    });
  }

  onSubmit () {
    //TO-DO: Asynchronous validation.
    let order = new Order(this.orderName);
    this.orderService.addOrder(order);
    this.navCtrl.popToRoot();
  }

}