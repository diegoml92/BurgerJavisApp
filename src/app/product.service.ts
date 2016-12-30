import { Product } from './product';

const productName = ["Hamburguesa", "Sandwich", "CocaCola", "Cerveza", "Agua"];
const productIngredients = [
  [{name:"Pan",extraPrice:0.0},{name:"Carne",extraPrice:0.0},{name:"Lechuga",extraPrice:0.0},{name:"Queso",extraPrice:0.0},{name:"Tomate",extraPrice:0.0}],
  [{name:"Pan",extraPrice:0.0},{name:"Jamón",extraPrice:0.0},{name:"Queso",extraPrice:0.0}],
  [], [], []];
const productPrice = [4.50, 3.50, 2.20, 1.25, 1.5];

export class ProductService {

  productList: Product[];

  constructor() {
    this.productList = [];

    for(let i = 0; i < productName.length; i++) {
      this.productList.push({
        name: productName[i],
        ingredients: productIngredients[i],
        price: productPrice[i]
      });
    }
  }

  /*getProductList(): Promise<Product[]> {
    return Promise.resolve(this.productList);
  }*/

  getProductList(): Promise<Product[]> {
    return new Promise(resolve => {
      // Simulate serve latency (1.5s)
      setTimeout(() => resolve(this.productList), 1500);
    });
  }

}