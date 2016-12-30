import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'new-product.component.html'
})

export class NewProductComponent {

  productName : string;
  productPrice: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  onSubmit () {
    //TO-DO: Create new product with given name and price.
    //       Asynchronous validation.
    this.navCtrl.popToRoot();
  }

}