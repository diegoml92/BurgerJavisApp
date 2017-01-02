import { Component } from '@angular/core';
import { NavController, NavParams, 
  AlertController, PopoverController } from 'ionic-angular';

import { Order } from '../../app/order';
import { OrderItem } from '../../app/order-item';
import { OrderService } from '../../app/order.service';
import { PopoverListComponent } from './popover-list.component';


@Component({
  templateUrl: 'order-details.component.html'
})
export class OrderDetailsComponent {

  order: Order;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
  	private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private orderService: OrderService) {

  	this.order = navParams.get('order');

  }

  increaseAmount(item: OrderItem) {
    this.orderService.increaseItemAmount(this.order, item);
  }

  addProduct() {
  	let popover = this.popoverCtrl.create(
      PopoverListComponent, {order: this.order});
  	popover.present();
  }

  deleteOrder() {
    let confirm = this.alertCtrl.create({
      title: '¿Borrar ' + this.order.name + '?',
      message: '¿Estás seguro de que quieres eliminar este pedido? ' +
        'Se perderá toda la información relacionada con este pedido...',
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
            this.removeOrder();
          }
        }
      ]
    });
    confirm.present();
  }

  removeOrder() {
    this.orderService.removeOrder(this.order);
    this.navCtrl.popToRoot();
  }

}