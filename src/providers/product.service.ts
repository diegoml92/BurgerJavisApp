import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Product } from '../app/product';
import { Util } from '../app/util';
import { Credentials } from '../app/credentials';
import { Operations } from '../app/commons';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  productList: Product[];

  constructor(private http: HTTP, private auth: AuthenticationManager) {}

  /** Return product list */
  getProductList(): Promise<Product[]> {
    var request : string = Util.getUrlForAction(Operations.PRODUCTS);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        this.productList = response.data as Product[];
        return this.productList;
      });
  }

  /** Return requested product */
  getProduct(product: Product): Promise<Product> {
    var request : string = Util.getUrlForAction(Operations.PRODUCTS, product._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        return response.data as Product;
      });
  }

  /** Create new product */
  addProduct(product: Product) {
    var request : string = Util.getUrlForAction(Operations.PRODUCTS);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.post(request, product, 
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newProduct = response.data as Product;
        this.productList.push(newProduct);
        return newProduct;
      });
  }

  /** Update product */
  updateProduct(product: Product): Promise<Product> {
    var request: string =
        Util.getUrlForAction(Operations.PRODUCTS, product._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.put(request, product,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newProduct = response.data as Product;
        let index = this.productList.indexOf(product);
        if(index >= 0) {
          this.productList[index] = newProduct;
        }
        return response.data;
      });
  }

  /** Delete product */
  removeProduct(product: Product) {
    var request : string = 
        Util.getUrlForAction(Operations.PRODUCTS, product._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.delete(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let index = this.productList.indexOf(product);
        if(index >= 0) {
          this.productList.splice(index, 1);
        }
        return response.data;
      });
  }

  /** Product name validation */
  checkProductName(newProductName: string): Promise<any> {
    return new Promise(resolve => {
      let found = false;
      let i = 0;
      while(!found && i < this.productList.length) {
        found = this.productList[i].name.toLowerCase() ===
          newProductName.toLowerCase().trim();
        i++;
      }
      if(found) {
        resolve("Product name is taken");
      } else {
        resolve(null);
      }
    });
  }

}