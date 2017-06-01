import { OrderItem } from './order-item';
import { OrderState } from './commons';

export class Order {

  _id?: string;
  state: OrderState = OrderState.INITIAL;

  constructor (
      public name: string,
      public username: string,
      public items: OrderItem[] = []) {}

  isFinished(): boolean {
  	return this.state === OrderState.FINISHED;
  }

}