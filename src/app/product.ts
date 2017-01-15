import { Ingredient } from './ingredient';
import { Category } from './category';

export class Product {

  constructor (
    public name: string,
    public price: number,
    public category?: Category,
    public ingredients?: Ingredient []) {
    if(!this.ingredients) {
      this.ingredients = [];
    }
  }
}