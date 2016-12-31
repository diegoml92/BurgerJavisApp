import { Ingredient } from './ingredient'

export class Product {

  constructor (
    public name: string,
    public price: number,
    public ingredients?: Ingredient []) {
    if(!this.ingredients) {
    	this.ingredients = [];
    }
  }
}