import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProductDetailsComponent } from '../product-details/product-details.component'
import { NewProductComponent } from '../new-product/new-product.component'

import { Product } from '../../app/product'
import { ProductService } from '../../app/product.service'


@Component({
  templateUrl: 'menu.component.html'
})
export class MenuComponent {

  menu: Product[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private productService: ProductService,
    private loadingCtrl: LoadingController) {}

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

  productTapped(event, product) {
    this.navCtrl.push(ProductDetailsComponent, {
      product: product
    });
  }

  addProduct(event) {
    this.navCtrl.push(NewProductComponent);
  }

}