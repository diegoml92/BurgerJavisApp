import { Ingredient } from './ingredient';
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

  addIngredientToProduct(product: Product, ingredient: Ingredient) {
    let index = this.productList.indexOf(product);
    if(index => 0) {
      this.productList[index].ingredients.push(ingredient);
    }
  }

  removeIngredientFromProduct(product: Product, ingredient: Ingredient) {
    let pIndex = this.productList.indexOf(product);
    if (pIndex => 0) {
      let iIndex = this.productList[pIndex].ingredients.indexOf(ingredient);
      if(iIndex => 0) {
        this.productList[pIndex].ingredients.splice(iIndex,1);
      }
    }
  }

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
        resolve("Procuct name is taken");
      } else {
        //TO-DO: Server side validation to be done
        setTimeout(() => resolve(null), 1500);
      }
    });
  }

}