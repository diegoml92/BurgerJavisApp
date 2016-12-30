import { Order } from './order';

const orderItems : any =
  [
    {name: "Hamburguesa", amount: 2},
    {name: "Sandwich", amount: 3},
    {name: "CocaCola", amount: 2},
    {name: "Cerveza", amount: 1},
    {name: "Agua", amount: 3}
  ];

export class OrderService {

  orderList: Order[];

  constructor() {
    this.orderList = [];
    
    for (let i=0; i < 5; i++) {
      this.orderList.push(
        new Order("Mesa" + (i + 1), orderItems, (Math.random() * 50))
      );
    }
  }

  /*getOrderList(): Promise<Order[]> {
    return Promise.resolve(this.orderList);
  }*/

  getOrderList(): Promise<Order[]> {
    return new Promise(resolve => {
      // Simulate serve latency (1.5s)
      setTimeout(() => resolve(this.orderList), 1500);
    });
  }
}