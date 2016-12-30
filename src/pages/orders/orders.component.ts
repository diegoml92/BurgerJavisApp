import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OrderDetailsComponent } from '../order-details/order-details.component'
import { NewOrderComponent } from '../new-order/new-order.component'

import { Order } from '../../app/order'


@Component({
  templateUrl: 'orders.component.html',
})
export class OrdersComponent {

  orders: Array<Order>;

  orderItems : any =
  [
    {name: "Hamburguesa", amount: 2},
    {name: "Sandwich", amount: 3},
    {name: "CocaCola", amount: 2},
    {name: "Cerveza", amount: 1},
    {name: "Agua", amount: 3}
  ];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams, 
  ) {
    this.orders = [];
    
    for (let i=0; i < 5; i++) {
      this.orders.push(new Order("Mesa" + (i + 1), this.orderItems, (Math.random() * 50)));
    }
  }

  orderTapped(event, order) {
    this.navCtrl.push(OrderDetailsComponent, {
      order: order
    });
  }

  addOrder(event) {
    this.navCtrl.push(NewOrderComponent);
  }

}