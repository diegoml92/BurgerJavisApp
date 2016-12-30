import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'new-order.component.html'
})

export class NewOrderComponent {

  orderName : string;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams) {}

  onSubmit () {
    //TO-DO: Create new order with given name (orderName);
    //       Asynchronous validation.
    this.navCtrl.popToRoot();
  }

}