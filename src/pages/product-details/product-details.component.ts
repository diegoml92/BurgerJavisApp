import { Component } from '@angular/core';
import { NavController, NavParams,
	PopoverController, ViewController } from 'ionic-angular';

import { Product } from '../../app/product'


@Component ({
	template: `
      <ion-row scroll="false">
        <ion-title margin>Seleccionar ingredientes</ion-title>
      </ion-row>
    	<ion-list>
    		<button ion-item (click)="close()">Pepinillo</button>
    		<button ion-item (click)="close()">Cebolla</button>
    		<button ion-item (click)="close()">Huevo</button>
    	</ion-list>
    	`
})
export class PopoverList {

	constructor(public viewCtrl: ViewController) {}

	close() {
		this.viewCtrl.dismiss();
	}
}

@Component({
  templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent {

  product: Product;
  //TO-DO: Include *ngIf="modified" to show save button 
  //       only when chages has been made to this product.
  modified: boolean;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public popoverCtrl: PopoverController) {

  	this.product = navParams.get('product');

  }

  saveProduct() {
  	//TO-DO: Update product information.
  	console.log("Store modifications made.");
  }

  deleteIngredient(event) {
  	//TO-DO: Update product by deleting selected ingredients.
  	console.log("Delete ingredient.");
  }

  addIngredient() {
  	//TO-DO: Generate list using ingredients left;
  	//       Update product adding selected ingredient.
  	let popover = this.popoverCtrl.create(PopoverList);
  	popover.present();
  }

}