import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, 
	PopoverController, ViewController } from 'ionic-angular';

import { Product } from '../../app/product';
import { ProductService } from '../../app/product.service'

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
  	private navCtrl: NavController,
  	private navParams: NavParams,
    private alertCtrl: AlertController,
  	private popoverCtrl: PopoverController,
    private productService: ProductService) {

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

  deleteProduct() {
    let confirm = this.alertCtrl.create({
      title: '¿Borrar ' + this.product.name + '?',
      message: '¿Estás seguro de que quieres eliminar este producto? ' +
        'Se perderá toda la información relacionada él...',
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
            this.removeProduct();
          }
        }
      ]
    });
    confirm.present();
  }

  removeProduct() {
    this.productService.removeProduct(this.product);
    this.navCtrl.popToRoot();
  }

}