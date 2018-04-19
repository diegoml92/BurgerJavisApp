import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Util } from '../app/util';
import { Credentials } from '../app/credentials';
import { Operations } from '../app/commons';
import { Order } from '../app/order';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {

  orderList: Order[];

  constructor(private http: HTTP, private auth: AuthenticationManager) {}

  /** Return order list */
  getOrderList(): Promise<Order[]> {
    var request : string = Util.getUrlForAction(Operations.ORDERS);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        this.orderList = response.data as Order[];
        return this.orderList;
      });
  }

  /** Create new order */
  addOrder(order: Order): Promise<Order> {
    var request : string = Util.getUrlForAction(Operations.ORDERS);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.post(request, order, 
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newOrder = response.data as Order;
        this.orderList.push(newOrder);
        return newOrder;
      });
  }

  /** Modify order */
  updateOrder(order: Order): Promise<Order> {
    var request: string =
        Util.getUrlForAction(Operations.ORDERS, order._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.put(request, order,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newOrder = response.data as Order;
        let index = this.orderList.indexOf(order);
        if(index >= 0) {
          this.orderList[index] = newOrder;
        }
        return response.data;
      });
  }

  /** Delete order */
  removeOrder(order: Order) {
    var request : string = 
        Util.getUrlForAction(Operations.ORDERS, order._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.delete(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let index = this.orderList.indexOf(order);
        if(index >= 0) {
          this.orderList.splice(index, 1);
        }
        return response.data;
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
        resolve(null);
      }
    });
  }

}