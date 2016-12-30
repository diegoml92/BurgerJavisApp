import { Component } from '@angular/core';
import { NavController, NavParams, 
	PopoverController, ViewController } from 'ionic-angular';

import { Order } from '../../app/order'


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
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public popoverCtrl: PopoverController) {

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

}