import { OrderItem } from './order-item';

export class Order {

  price: number = 0.0;

  constructor (public name: string, public items?: OrderItem[]) {
    if(!this.items) {
      this.items = [];
    }
    this.calculateOrderPrice();
  }

  calculateOrderPrice () {
    for(let i=0; i<this.items.length; i++) {
      this.price += this.items[i].product.price * this.items[i].amount;
    }
  }
}