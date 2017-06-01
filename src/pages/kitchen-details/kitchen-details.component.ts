import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, ToastController,
  AlertController } from 'ionic-angular';

import { Order } from '../../app/order';
import { KitchenService } from '../../app/kitchen.service';

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
      private kitchenService: KitchenService) {
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
        let toast = this.toastCtrl.create({
          message: 'Error al obtener la comanda',
          duration: 3000,
          position: 'bottom'
        });
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
        let toast = this.toastCtrl.create({
          message: 'Error al actualizar el pedido',
          duration: 3000,
          position: 'bottom'
        });
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