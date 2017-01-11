import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Order } from '../../app/order';
import { Product } from '../../app/product';
import { OrderService } from '../../app/order.service';


@Component ({
	templateUrl: 'popover-list.component.html'
})
export class PopoverListComponent {

  order: Order;
  localList: Product[];

	constructor(
    private viewCtrl: ViewController, 
    private navParams: NavParams,
    private orderService: OrderService
  ) {
    this.localList = this.navParams.get('products');
    this.order = this.navParams.get('order');
  }

  addProduct(product: Product) {
    this.orderService.addProductToOrder(this.order, product);
    this.close();
  }

	close() {
		this.viewCtrl.dismiss();
	}
}