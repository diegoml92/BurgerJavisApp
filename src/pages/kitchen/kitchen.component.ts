import { Component } from '@angular/core';
import { NavController, AlertController,
  ToastController, LoadingController } from 'ionic-angular';

import { Order } from '../../app/order';
import { N_COLS } from '../../app/commons';
import { KitchenDetailsComponent } from '../../pages/kitchen-details/kitchen-details.component';
import { KitchenService } from '../../app/kitchen.service';

@Component({
  templateUrl: 'kitchen.component.html'
})
export class KitchenComponent {

  orders: Array<Order>;
  rows: Order[][];

  constructor(
      private navCtrl: NavController,
      private kitchenService: KitchenService,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando pedidos..."
    });
    loading.present();
    this.kitchenService.getOrderList()
      .then(orders => {
        this.orders = orders;
        this.rows = new Array(Math.ceil(orders.length/N_COLS));
        for(let i = 0; i < this.rows.length; i++) {
          if(i === this.rows.length - 1 && orders.length % N_COLS !== 0) {
            this.rows[i] = new Array(orders.length % N_COLS);
          } else {
            this.rows[i] = new Array(N_COLS);
          }
        }
        for(let i = 1; i <= this.orders.length; i++) {
          let row = Math.ceil(i / N_COLS) - 1;
          let col = i % N_COLS != 0 ? i % N_COLS - 1 : N_COLS - 1;
          this.rows[row][col] = this.orders[i-1];
        }
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al solicitar los pedidos',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  orderTapped(order) {
    this.navCtrl.push(KitchenDetailsComponent, {
      order: order
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
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
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