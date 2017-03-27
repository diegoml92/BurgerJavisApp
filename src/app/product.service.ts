import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Product } from './product';
import { Util } from './util';
import { Operations, JSON_HEADER } from './commons';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  productList: Product[];

  constructor(private http: Http) {}

  /** Return product list */
  getProductList(): Promise<Product[]> {
    var request : string = Util.getUrlForAction(Operations.PRODUCTS);
    return this.http.get(request).toPromise()
      .then(response => {
        this.productList = response.json() as Product[];
        return this.productList;
      });
  }

  /** Create new product */
  addProduct(product: Product) {
    var request : string = Util.getUrlForAction(Operations.PRODUCTS);
    return this.http.post(request, JSON.stringify(product), 
                            {headers: JSON_HEADER})
      .toPromise()
      .then(response => {
        let newProduct = response.json() as Product;
        this.productList.push(newProduct);
        return newProduct;
      });
  }

  /** Update product */
  updateProduct(product: Product): Promise<Product> {
    var request: string =
        Util.getUrlForAction(Operations.PRODUCTS, product._id);
    return this.http.put(request, JSON.stringify(product),
                            {headers: JSON_HEADER})
      .toPromise()
      .then(response => {
        let newProduct = response.json() as Product;
        let index = this.productList.indexOf(product);
        if(index >= 0) {
          this.productList[index] = newProduct;
        }
        return response.json();
      });
  }

  /** Delete product */
  removeProduct(product: Product) {
    var request : string = 
        Util.getUrlForAction(Operations.PRODUCTS, product._id);
    return this.http.delete(request).toPromise()
      .then(response => {
        let index = this.productList.indexOf(product);
        if(index >= 0) {
          this.productList.splice(index, 1);
        }
        return response.json();
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