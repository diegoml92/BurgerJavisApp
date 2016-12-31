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
      // Simulate serve latency (1.5s)
      setTimeout(() => resolve(this.productList), 1500);
    });
  }

  addProduct(product: Product) {
    this.productList.push(product);
  }

}