import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,
  AlertController, LoadingController } from 'ionic-angular';

import { Product } from '../../app/product';
import { Ingredient } from '../../app/ingredient';
import { ProductService } from '../../app/product.service';
import { IngredientService } from '../../app/ingredient.service';

@Component({
  templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent {

  product: Product;
  modified: boolean = false;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private ingredientService: IngredientService
  ) {

  	this.product = navParams.get('product');

  }

  deleteIngredient(ingredient: Ingredient) {
    let iIndex = this.product.ingredients.indexOf(ingredient);
    if(iIndex => 0) {
      this.product.ingredients.splice(iIndex,1);
      this.modified = true;
    }
  }

  addIngredient() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Nuevo ingrediente');

    let loading = this.loadingCtrl.create({
      content: "Cargando ingredientes..."
    });
    loading.present();

    let ingredientList: Ingredient[];
    this.ingredientService.getIngredientList()
      .then(ingredients => {
        loading.dismiss();

        ingredientList = ingredients;

        for(let i=0; i<ingredientList.length; i++) {
          let index = -1;
          if(this.product.ingredients) {
            index = this.product.ingredients.indexOf(ingredientList[i]);
          }
          alert.addInput({
            type: 'checkbox',
            label: ingredientList[i].name,
            value: i.toString(),
            checked: index >= 0
          });
        }

        alert.addButton('Cancelar');
        alert.addButton({
          text: 'Aceptar',
          handler: data => {
            for(let i=0; i<data.length; i++) {
              let ing = ingredientList[data[i]];
              if(this.product.ingredients &&
                  this.product.ingredients.indexOf(ing) < 0) {
                this.product.ingredients.push(ing);
                this.modified = true;
              }
            }
          }
        });
        alert.present();

      })
      .catch(() => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al obtener la lista de ingredientes',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  /** Update product */
  updateProduct() {
    let loading = this.loadingCtrl.create({
      content: "Actualizando producto..."
    });
    loading.present();
    this.productService.updateProduct(this.product)
      .then(() => {
        loading.dismiss();
        this.modified = false;
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Error al actualiar el producto',
          duration: 3000,
          position: 'bottom'
        });
        console.error(JSON.stringify(err));
        loading.dismiss();
        toast.present();
      });
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
    let loading = this.loadingCtrl.create({
      content: "Borrando producto..."
    });
    loading.present();
    this.productService.removeProduct(this.product)
      .then(() => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al borrar el producto',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

}