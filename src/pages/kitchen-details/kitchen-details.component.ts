import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, ToastController,
  AlertController } from 'ionic-angular';

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
      private alertCtrl: AlertController,
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
    this.kitchenService.getOrder(this.order)
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
    this.kitchenService.updateOrder(order)
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
    let confirm = this.alertCtrl.create({
      title: '¿Servir \'' + order.name + '\'?',
      message: 'Se marcará el pedido como preparado...',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // No further action
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.orderServed(order);
          }
        }
      ]
    });
    confirm.present();
  }
  
}