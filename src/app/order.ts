import { OrderItem } from './order-item';

export class Order {

  _id?: string;
  finished: boolean = false;

  constructor (public name: string, public items?: OrderItem[]) {
    if(!this.items) {
      this.items = [];
    }
  }

}