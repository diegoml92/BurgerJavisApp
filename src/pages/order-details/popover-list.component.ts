import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Order } from '../../app/order';
import { Product } from '../../app/product';
import { ProductService } from '../../app/product.service';
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
    private productService: ProductService,
    private orderService: OrderService
   ) {
    this.order = this.navParams.get('order');
    this.fillProductList();
  }

  fillProductList() {
    this.localList = [];
    this.productService.getProductList()
      .then(products => {
        for (let i=0; i<products.length; i++) {
          let found = false;
          let j=0;
          while(!found && j<this.order.items.length) {
            found = products[i]===this.order.items[j].product;
            j++;
          }
          if(!found) {
            this.localList.push(products[i]);
          }
        }
      });
  }

  addProduct(product: Product) {
    this.orderService.addProductToOrder(this.order, product);
    this.close();
  }

	close() {
		this.viewCtrl.dismiss();
	}
}