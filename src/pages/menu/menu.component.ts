import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductDetailsComponent } from '../product-details/product-details.component'
import { NewProductComponent } from '../new-product/new-product.component'

import { Product } from '../../app/product'


@Component({
  templateUrl: 'menu.component.html'
})
export class MenuComponent {

  menu: Array<Product>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.menu = [];

    let productName = ["Hamburguesa", "Sandwich", "CocaCola", "Cerveza", "Agua"];
    let productIngredients = [
      [{name:"Pan",extraPrice:0.0},{name:"Carne",extraPrice:0.0},{name:"Lechuga",extraPrice:0.0},{name:"Queso",extraPrice:0.0},{name:"Tomate",extraPrice:0.0}],
      [{name:"Pan",extraPrice:0.0},{name:"Jamón",extraPrice:0.0},{name:"Queso",extraPrice:0.0}],
      [], [], []];
    let productPrice = [4.50, 3.50, 2.20, 1.25, 1.5];

    for(let i = 0; i < productName.length; i++) {
      this.menu.push({
        name: productName[i],
        ingredients: productIngredients[i],
        price: productPrice[i]
      });
    }

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