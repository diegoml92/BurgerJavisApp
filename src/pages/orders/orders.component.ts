import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { Util } from '../../app/util';

import { OrderDetailsComponent } from '../order-details/order-details.component';
import { NewOrderComponent } from '../new-order/new-order.component';

import { Order } from '../../app/order';
import { OrderState } from '../../app/commons';
import { OrderService } from '../../providers/order.service';


@Component({
  templateUrl: 'orders.component.html',
})
export class OrdersComponent {

  orders: Array<Order>;

  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
    private toastCtrl: ToastController,
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
      })
      .catch(() => {
        loading.dismiss();
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al solicitar los pedidos'));
        toast.present();
      });
  }

  calculateOrderPrice(order: Order): number {
    var price: number = 0;
    for(let i=0; i<order.items.length; i++) {
      price += order.items[i].product.price * order.items[i].amount;
    }
    return price;
  }

  orderTapped(event, order) {
    this.navCtrl.push(OrderDetailsComponent, {
      order: order
    });
  }

  addOrder(event) {
    this.navCtrl.push(NewOrderComponent);
  }

  isServed(order: Order): boolean {
    let value = OrderState[order.state];
    return value == OrderState.SERVED.toString();
  }

  isKitchen(order: Order): boolean {
    let value = OrderState[order.state];
    return value == OrderState.KITCHEN.toString();
  }

}