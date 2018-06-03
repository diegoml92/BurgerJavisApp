import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,
  AlertController, LoadingController } from 'ionic-angular';

import { Product } from '../../app/product';
import { Category } from '../../app/category';
import { Ingredient } from '../../app/ingredient';
import { ProductService } from '../../providers/product.service';
import { CategoryService } from '../../providers/category.service';
import { IngredientService } from '../../providers/ingredient.service';

@Component({
  templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent {

  product: Product;
  categories: Category[];
  modified: boolean = false;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService
  ) {

  	this.product = this.navParams.get('product');

  }

  private getProduct(loading) {
    this.productService.getProduct(this.product)
      .then(product => {
        this.product = product;
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al obtener el producto',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.popToRoot();
      });
  }

  private getCategoryList(loading) {
    this.categoryService.getCategoryList()
      .then(categories => {
        this.categories = categories;
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        console.error(JSON.stringify(err));
        let toast = this.toastCtrl.create({
          message: 'Error al obtener lista de categorías',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.popToRoot();
      });
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando producto..."
    });
    let loading2 = this.loadingCtrl.create({
      content: "Cargando categorías..."
    });
    loading.present();
    this.getProduct(loading);
    loading2.present();
    this.getCategoryList(loading2);
  }

  deleteIngredient(ingredient: Ingredient) {
    let iIndex = this.product.ingredients.indexOf(ingredient);
    if(iIndex => 0) {
      this.product.ingredients.splice(iIndex,1);
      this.modified = true;
    }
  }

  private fillIngredients(alert, ingredientList) {
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
  }

  private addButtons(alert, ingredientList) {
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

        this.fillIngredients(alert, ingredientList);

        this.addButtons(alert, ingredientList);

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
        loading.dismiss();
        toast.present();
      });
  }

  updateName() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo nombre',
      inputs: [
        {
          name: 'name',
          placeholder: this.product.name,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Actualizar',
          handler: data => {
            this.productService.checkProductName(data.name)
              .then (result => {
                if (result === null) {
                  this.product.name = data.name;
                  this.modified = true;
                } else {
                  let toast = this.toastCtrl.create({
                    message: 'Este nombre ya está siendo usado',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                }
              });
          }
        }
      ]
    });
    alert.present();
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