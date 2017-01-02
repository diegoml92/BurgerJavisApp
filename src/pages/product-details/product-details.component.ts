import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Product } from '../../app/product';
import { Ingredient } from '../../app/ingredient';
import { ProductService } from '../../app/product.service';

@Component({
  templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent {

  product: Product;
  modified: boolean;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
    private alertCtrl: AlertController,
    private productService: ProductService
  ) {

  	this.product = navParams.get('product');

  }

  deleteIngredient(ingredient: Ingredient) {
    this.productService.removeIngredientFromProduct(this.product, ingredient);
  }

  addIngredient() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo ingrediente',
      inputs: [
        {
          //TO-DO: Validation
          name: 'name',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Añadir',
          handler: data => {
            console.log(JSON.stringify(data));
            this.productService.addIngredientToProduct(
              this.product,{name: data.name, extraPrice: 0.0}
            );
          }
        }
      ]
    });
    prompt.present();
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