import { OrderItem } from './order-item';

export class Order {

  _id?: string;
  finished: boolean = false;

  constructor (
      public name: string,
      public username: string,
      public items: OrderItem[] = []) {}

}