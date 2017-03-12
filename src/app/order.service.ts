import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Util } from './util';
import { Operations, JSON_HEADER } from './commons';
import { Order } from './order';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {

  orderList: Order[];

  constructor(private http: Http) {}

  /** Return order list */
  getOrderList(): Promise<Order[]> {
    var request : string = Util.getUrlForAction(Operations.ORDERS);
    return this.http.get(request).toPromise()
      .then(response => {
        this.orderList = response.json() as Order[];
        return this.orderList;
      });
  }

  /** Create new order */
  addOrder(order: Order): Promise<Order> {
    var request : string = Util.getUrlForAction(Operations.ORDERS);
    return this.http.post(request, JSON.stringify(order), 
                            {headers: JSON_HEADER})
      .toPromise()
      .then(response => {
        let newOrder = response.json() as Order;
        this.orderList.push(newOrder);
        return newOrder;
      });
  }

  /** Modify order */
  updateOrder(order: Order): Promise<Order> {
    var request: string =
        Util.getUrlForAction(Operations.ORDERS, order._id);
    console.log(JSON.stringify(order));
    return this.http.put(request, JSON.stringify(order),
                            {headers: JSON_HEADER})
      .toPromise()
      .then(response => {
        let newOrder = response.json() as Order;
        let index = this.orderList.indexOf(order);
        if(index >= 0) {
          this.orderList[index] = newOrder;
        }
        return response.json();
      });
  }

  /** Delete order */
  removeOrder(order: Order) {
    var request : string = 
        Util.getUrlForAction(Operations.ORDERS, order._id);
    return this.http.delete(request).toPromise()
      .then(response => {
        let index = this.orderList.indexOf(order);
        if(index >= 0) {
          this.orderList.splice(index, 1);
        }
        return response.json();
      });
  }

  /** Order name validation */
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
        setTimeout(() => resolve(null), 500);
      }
    });
  }

}