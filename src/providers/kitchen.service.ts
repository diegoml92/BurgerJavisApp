import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Util } from '../app/util';
import { Credentials } from '../app/credentials';
import { Operations } from '../app/commons';
import { Order } from '../app/order';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class KitchenService {

  orderList: Order[];

  constructor(private http: HTTP, private auth: AuthenticationManager) {}

  /** Return order list */
  getOrderList(): Promise<Order[]> {
    var request : string = Util.getUrlForAction(Operations.KITCHEN);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        this.orderList = response.data as Order[];
        return this.orderList;
      });
  }

  /** Return order list for the kitchen */
  getOrder(order: Order): Promise<Order> {
    var request : string = Util.getUrlForAction(Operations.KITCHEN, order._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        return response.data as Order;
      });
  }

  /** Modify order */
  updateOrder(order: Order): Promise<Order> {
    var request: string =
        Util.getUrlForAction(Operations.KITCHEN, order._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.put(request, order,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newOrder = response.data as Order;
        let index = this.orderList.indexOf(order);
        if(index >= 0) {
          this.orderList[index] = newOrder;
        }
        return newOrder;
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

}