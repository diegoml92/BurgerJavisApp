import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Order } from '../../app/order';
import { OrderService } from '../../app/order.service';

@Component({
  templateUrl: 'new-order.component.html'
})

export class NewOrderComponent {

  orderName : string;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    private orderService: OrderService) {}

  onSubmit () {
    //TO-DO: Asynchronous validation.
    let order = new Order(this.orderName);
    this.orderService.addOrder(order);
    this.navCtrl.popToRoot();
  }

}