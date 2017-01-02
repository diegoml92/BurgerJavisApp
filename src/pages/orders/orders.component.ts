import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { OrderDetailsComponent } from '../order-details/order-details.component'
import { NewOrderComponent } from '../new-order/new-order.component'

import { Order } from '../../app/order'
import { OrderService } from '../../app/order.service'


@Component({
  templateUrl: 'orders.component.html',
})
export class OrdersComponent {

  orders: Array<Order>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private orderService: OrderService,
    private loadingCtrl: LoadingController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando pedidos..."
    });
    loading.present();
    this.orderService.getOrderList()
      .then(orders => {
        this.orders = orders;
        loading.dismiss();
      });
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