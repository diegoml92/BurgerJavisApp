import { Order } from './order';
import { OrderItem } from './order-item';
import { Product } from './product';
import { ORDER_ITEMS } from './mock-data';

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

  addProductToOrder(order: Order, product: Product) {
    let index = this.orderList.indexOf(order);
    if(index => 0) {
      this.orderList[index].items.push({product: product, amount: 1});
    }
  }

  increaseItemAmount(order: Order, item: OrderItem) {
    let oIndex = this.orderList.indexOf(order);
    if(oIndex => 0) {
      let iIndex = this.orderList[oIndex].items.indexOf(item);
      if(iIndex => 0) {
        this.orderList[oIndex].items[iIndex].amount += 1;
      }
    }
  }

  checkOrderName(newOrderName: string): Promise<any> {
    return new Promise(resolve => {
      let found = false;
      let i = 0;
      while(!found && i < this.orderList.length) {
        found = this.orderList[i].name.toLowerCase() === 
          newOrderName.toLowerCase().trim();
        i++;
      }
      if(found) {
        resolve("Order name is taken");
      } else {
        //TO-DO: Server side validation to be done
        setTimeout(() => resolve(null), 1500);
      }
    });
  }

}