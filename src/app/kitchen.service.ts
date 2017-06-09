import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Util } from './util';
import { Operations } from './commons';
import { Order } from './order';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class KitchenService {

  constructor(private http: Http, private auth: AuthenticationManager) {}

  /** Return order list */
  getOrderList(): Promise<Order[]> {
    var request : string = Util.getUrlForAction(Operations.KITCHEN);
    return this.http.get(request, 
        {headers: this.auth.generateAuthHeader()})
      .toPromise()
      .then(response => {
        return response.json() as Order[];
      });
  }

  /** Return order list for the kitchen */
  getOrder(order: Order): Promise<Order> {
    var request : string = Util.getUrlForAction(Operations.KITCHEN, order._id);
    return this.http.get(request, 
        {headers: this.auth.generateAuthHeader()})
      .toPromise()
      .then(response => {
        return response.json() as Order;
      });
  }

  /** Modify order */
  updateOrder(order: Order): Promise<Order> {
    var request: string =
        Util.getUrlForAction(Operations.KITCHEN, order._id);
    return this.http.put(request, JSON.stringify(order),
        {headers: this.auth.generateJsonAuthHeader()})
      .toPromise()
      .then(response => {
        return response.json() as Order;
      });
  }

  /** Delete order */
  removeOrder(order: Order) {
    var request : string = 
        Util.getUrlForAction(Operations.ORDERS, order._id);
    return this.http.delete(request,
        {headers: this.auth.generateAuthHeader()})
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

}