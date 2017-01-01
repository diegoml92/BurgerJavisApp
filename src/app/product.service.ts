import { Product } from './product';
import { PRODUCTS } from './mock-data';

export class ProductService {

  productList: Product[];

  constructor() {
    this.productList = [];

    for(let i = 0; i < PRODUCTS.length; i++) {
      this.productList.push(PRODUCTS [i]);
    }
  }

  getProductList(): Promise<Product[]> {
    return new Promise(resolve => {
      // Simulate server latency (1.5s)
      setTimeout(() => resolve(this.productList), 1500);
    });
  }

  addProduct(product: Product) {
    this.productList.push(product);
  }

  removeProduct(product: Product) {
    let index = this.productList.indexOf(product);
    if(index => 0) {
      this.productList.splice(index, 1);
    }
  }

}