import { Component } from '@angular/core';
import { NavController, ViewController, ToastController,
  LoadingController, PopoverController } from 'ionic-angular';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { CategoriesComponent } from '../categories/categories.component';

import { Product } from '../../app/product';
import { ProductService } from '../../providers/product.service';
import { AuthenticationManager } from '../../providers/authentication-manager';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="goToCategories()">
        Categorías
      </button>
      <button ion-item (click)="goToIngredients()">
        Ingredientes
      </button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(private viewCtrl: ViewController) {}

  goToCategories() {
    this.viewCtrl.dismiss(CategoriesComponent);
  }

  goToIngredients() {
    this.viewCtrl.dismiss(IngredientsComponent)
  }

}


@Component({
  templateUrl: 'menu.component.html'
})
export class MenuComponent {

  menu: Product[];

  constructor(
    private navCtrl: NavController,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    private auth: AuthenticationManager) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando menú..."
    });
    loading.present();
    this.productService.getProductList()
      .then(menu => {
        this.menu = menu;
        loading.dismiss();
      })
      .catch(() => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al solicitar los productos de la carta',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });;
  }

  productTapped(product: Product) {
    this.navCtrl.push(ProductDetailsComponent, {
      product: product
    });
  }

  addProduct() {
    this.navCtrl.push(NewProductComponent);
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      if(data) {
        this.navCtrl.push(data);
      }
    });
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

}