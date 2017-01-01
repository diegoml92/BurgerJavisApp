import { Order } from './order';
import { ORDER_ITEMS } from './mock-data'

export class OrderService {

  orderList: Order[];

  constructor() {
    this.orderList = [];
    
    for (let i=0; i < ORDER_ITEMS.length; i++) {
      this.orderList.push(new Order("Mesa" + (i + 1), ORDER_ITEMS[i]));
    }
  }

  getOrderList(): Promise<Order[]> {
    return new Promise(resolve => {
      // Simulate server latency (1.5s)
      setTimeout(() => resolve(this.orderList), 1500);
    });
  }

  addOrder(order: Order) {
    this.orderList.push(order);
  }

  removeOrder(order: Order) {
    let index = this.orderList.indexOf(order);
    if(index => 0) {
      this.orderList.splice(index, 1);
    }
  }

}