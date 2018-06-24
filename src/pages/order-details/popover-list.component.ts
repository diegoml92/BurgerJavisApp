import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Order } from '../../app/order';
import { Product } from '../../app/product';

@Component ({
  templateUrl: 'popover-list.component.html'
})
export class PopoverListComponent {

  order: Order;
  localList: Product[];

  constructor(
    private viewCtrl: ViewController, 
    private navParams: NavParams
  ) {
    this.localList = this.navParams.get('products');
    this.order = this.navParams.get('order');
  }

  addProduct(product: Product) {
    this.order.items.push({product: product, amount: 1});
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}