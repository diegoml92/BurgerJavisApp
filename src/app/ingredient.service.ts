import { Ingredient } from './ingredient';
import { INGREDIENTS } from './mock-data';

export class IngredientService {

  ingredientList: Ingredient[];

  constructor() {
    this.ingredientList = [];

    for(let i=0; i<INGREDIENTS.length; i++) {
      this.ingredientList.push(INGREDIENTS [i]);
    }
  }

  getIngredientList(): Promise<Ingredient[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.ingredientList);
      }, 1500);
    });
  }

  removeIngredient(ingredient: Ingredient) {
    let index = this.ingredientList.indexOf(ingredient);
    if(index => 0) {
      this.ingredientList.splice(index, 1);
    }
  }
}