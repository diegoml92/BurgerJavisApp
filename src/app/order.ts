import { OrderItem } from './order-item';
import { OrderState } from './commons';

export class Order {

  _id?: string;

  constructor (
      public name: string,
      public username: string,
      public items: OrderItem[] = [],
      public state: OrderState = OrderState.INITIAL) {}

}