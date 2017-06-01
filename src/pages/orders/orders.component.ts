import { Component } from '@angular/core';
import { NavController, NavParams,
  ToastController, LoadingController } from 'ionic-angular';

import { OrderDetailsComponent } from '../order-details/order-details.component';
import { NewOrderComponent } from '../new-order/new-order.component';

import { Order } from '../../app/order';
import { OrderService } from '../../app/order.service';


@Component({
  templateUrl: 'orders.component.html',
})
export class OrdersComponent {

  orders: Array<Order>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
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
        let toast = this.toastCtrl.create({
          message: 'Error al solicitar los pedidos',
          duration: 3000,
          position: 'bottom'
        });
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

}