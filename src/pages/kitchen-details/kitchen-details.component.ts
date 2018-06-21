import { Component } from '@angular/core';

import { NavController, NavParams, 
  LoadingController, ToastController } from 'ionic-angular';

import { Util } from '../../app/util';

import { Order } from '../../app/order';
import { OrderService } from '../../providers/order.service';

@Component({
  templateUrl: 'kitchen-details.component.html'
})
export class KitchenDetailsComponent {

  order: Order;

  constructor (
      private navCtrl: NavController,
      private navParams: NavParams,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private kitchenService: OrderService) {
    this.order = this.navParams.get('order');
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando comanda..."
    });
    loading.present();
    this.kitchenService.getOrder(this.order, true)
      .then(order => {
        this.order = order;
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al obtener la comanda'));
        toast.present();
        this.navCtrl.popToRoot();
      });
  }

  orderServed(order) {
    let loading = this.loadingCtrl.create({
      content: "Sirviendo pedido..."
    });
    loading.present();
    this.kitchenService.updateOrder(order, true)
      .then(() => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al actualizar el pedido'));
        toast.present();
      });
  }

  serveOrder(order) {
    this.orderServed(order);
  }
  
}