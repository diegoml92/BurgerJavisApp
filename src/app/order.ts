import { OrderItem } from './order-item';

export class Order {

	constructor (
		public name: string,
		public items: OrderItem[],
		public price: number) {}
}