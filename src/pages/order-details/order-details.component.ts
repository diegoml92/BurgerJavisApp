import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,
  AlertController, PopoverController } from 'ionic-angular';

import { Order } from '../../app/order';
import { OrderItem } from '../../app/order-item';
import { OrderService } from '../../app/order.service';
import { ProductService } from '../../app/product.service';
import { PopoverListComponent } from './popover-list.component';


@Component({
  templateUrl: 'order-details.component.html'
})
export class OrderDetailsComponent {

  order: Order;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
  	private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private orderService: OrderService,
    private productService: ProductService) {

  	this.order = navParams.get('order');

  }

  increaseAmount(item: OrderItem) {
    this.orderService.increaseItemAmount(this.order, item);
  }

  addProduct() {
    let localList = [];

    let loading = this.loadingCtrl.create({
      content: "Cargando productos..."
    });
    loading.present();

    this.productService.getProductList()
      .then(products => {
        loading.dismiss();
        if(this.order.items.length) {
          for (let i=0; i<products.length; i++) {
            let found = false;
            let j=0;
            while(!found && j<this.order.items.length) {
              found = products[i]===this.order.items[j].product;
              j++;
            }
            if(!found) {
              localList.push(products[i]);
            }
          }
        } else {
          localList = products;
        }
        let popover = this.popoverCtrl.create(
          PopoverListComponent, {products: localList, order: this.order});
        popover.present();
      });
  }

  deleteOrder() {
    let confirm = this.alertCtrl.create({
      title: '¿Borrar ' + this.order.name + '?',
      message: '¿Estás seguro de que quieres eliminar este pedido? ' +
        'Se perderá toda la información relacionada con este pedido...',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // No further action
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.removeOrder();
          }
        }
      ]
    });
    confirm.present();
  }

  removeOrder() {
    this.orderService.removeOrder(this.order);
    this.navCtrl.popToRoot();
  }

}