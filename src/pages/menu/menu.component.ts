import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, 
  LoadingController, PopoverController } from 'ionic-angular';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { IngredientsComponent } from '../ingredients/ingredients.component';

import { Product } from '../../app/product';
import { ProductService } from '../../app/product.service';

@Component({
  template: `
    <button ion-item (click)="onClick()">
      Ingredientes
    </button>
  `
})
export class PopoverPage {

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController) {}

  onClick() {
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}


@Component({
  templateUrl: 'menu.component.html'
})
export class MenuComponent {

  menu: Product[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private productService: ProductService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando menú..."
    });
    loading.present();
    this.productService.getProductList()
      .then(menu => {
        this.menu = menu;
        loading.dismiss();
      });
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
    popover.onDidDismiss(() => this.navCtrl.push(IngredientsComponent));
  }

}