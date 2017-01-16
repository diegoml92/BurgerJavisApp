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

  addIngredient(ingredient: Ingredient): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.ingredientList.push(ingredient);
        resolve();
      });
    });
  }

  removeIngredient(ingredient: Ingredient) {
    let index = this.ingredientList.indexOf(ingredient);
    if(index => 0) {
      this.ingredientList.splice(index, 1);
    }
  }

  checkIngredientName(newIngredientName: string): Promise<any> {
    return new Promise(resolve => {
      let found = false;
      let i = 0;
      while(!found && i < this.ingredientList.length) {
        found = this.ingredientList[i].name.toLowerCase() ===
          newIngredientName.toLowerCase().trim();
        i++;
      }
      if(found) {
        resolve("Ingredient name is taken");
      } else {
        //TO-DO: Server side validation to be done
        setTimeout(() => resolve(null), 1500);
      }
    });
  }

}