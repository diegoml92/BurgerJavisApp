import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../app/product';
import { ProductService } from '../../app/product.service';

@Component({
  templateUrl: 'new-product.component.html'
})

export class NewProductComponent {

  productName : string;
  productPrice: number;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
  	private productService: ProductService) {}

  onSubmit () {
    //TO-DO: Asynchronous validation.
    let product = new Product(this.productName, this.productPrice);
    this.productService.addProduct(product);
    this.navCtrl.popToRoot();
  }

}