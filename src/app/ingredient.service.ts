import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Ingredient } from './ingredient';
import { Util } from './util';
import { Operations } from './commons';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IngredientService {

  ingredientList: Ingredient[];

  constructor(private http: Http) {
    this.ingredientList = [];
  }

  /** Return ingredient list */
  getIngredientList(): Promise<Ingredient[]> {
    var request : string = Util.getUrlForAction(Operations.INGREDIENTS);
    return this.http.get(request,
        {headers: AuthenticationManager.generateAuthHeader()})
      .toPromise()
      .then(response => {
        this.ingredientList = response.json() as Ingredient[];
        return this.ingredientList;
      });
  }

  /** Create new ingredient */
  addIngredient(ingredient: Ingredient): Promise<Ingredient> {
    var request : string = Util.getUrlForAction(Operations.INGREDIENTS);
    return this.http.post(request, JSON.stringify(ingredient), 
        {headers: AuthenticationManager.generateJsonAuthHeader()})
      .toPromise()
      .then(response => {
        let newIngredient = response.json() as Ingredient;
        this.ingredientList.push(newIngredient);
        return newIngredient;
      });
  }

  /** Modify ingredient */
  updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
    var request: string =
        Util.getUrlForAction(Operations.INGREDIENTS, ingredient._id);
    return this.http.put(request, JSON.stringify(ingredient),
        {headers: AuthenticationManager.generateJsonAuthHeader()})
      .toPromise()
      .then(response => {
        let newIngredient = response.json() as Ingredient;
        let index = this.ingredientList.indexOf(ingredient);
        if(index >= 0) {
          this.ingredientList[index] = newIngredient;
        }
        return response.json();
      });
  }

  /** Delete ingredient */
  removeIngredient(ingredient: Ingredient): Promise<any> {
    var request : string = 
        Util.getUrlForAction(Operations.INGREDIENTS, ingredient._id);
    return this.http.delete(request,
        {headers: AuthenticationManager.generateAuthHeader()})
      .toPromise()
      .then(response => {
        let index = this.ingredientList.indexOf(ingredient);
        if(index >= 0) {
          this.ingredientList.splice(index, 1);
        }
        return response.json();
      });
  }

  /** Ingredient name validation */
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
        resolve(null);
      }
    });
  }

}