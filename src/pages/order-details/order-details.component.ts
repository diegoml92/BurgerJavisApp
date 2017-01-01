import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,
	PopoverController, ViewController } from 'ionic-angular';

import { Order } from '../../app/order'
import { OrderService } from '../../app/order.service'

@Component ({
	template: `
      <ion-row scroll="false">
        <ion-title margin>Seleccionar producto</ion-title>
      </ion-row>
    	<ion-list>
    		<button ion-item (click)="close()">Ensalada</button>
    		<button ion-item (click)="close()">Filete Pollo</button>
    		<button ion-item (click)="close()">Trina Naranja</button>
    		<button ion-item (click)="close()">Café</button>
    	</ion-list>
    	`
})
export class PopoverList2 {

	constructor(public viewCtrl: ViewController) {}

	close() {
		this.viewCtrl.dismiss();
	}
}


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

  increaseAmount(event) {
    //TO-DO: Increase product amount when button is tapped.
    console.log("Increment 'amount' value.");
  }

  addProduct() {
    //TO-DO: Generate list using products left;
    //       Update order adding selected product.
  	let popover = this.popoverCtrl.create(PopoverList2);
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