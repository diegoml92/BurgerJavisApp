import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Ingredient } from '../app/ingredient';
import { Util } from '../app/util';
import { Credentials } from '../app/credentials';
import { Operations } from '../app/commons';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IngredientService {

  ingredientList: Ingredient[];

  constructor(private http: HTTP, private auth: AuthenticationManager) {
    this.ingredientList = [];
  }

  /** Return ingredient list */
  getIngredientList(): Promise<Ingredient[]> {
    var request : string = Util.getUrlForAction(Operations.INGREDIENTS);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        this.ingredientList = response.data as Ingredient[];
        return this.ingredientList;
      });
  }

  /** Create new ingredient */
  addIngredient(ingredient: Ingredient): Promise<Ingredient> {
    var request : string = Util.getUrlForAction(Operations.INGREDIENTS);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.post(request, ingredient, 
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newIngredient = response.data as Ingredient;
        this.ingredientList.push(newIngredient);
        return newIngredient;
      });
  }

  /** Modify ingredient */
  updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
    var request: string =
        Util.getUrlForAction(Operations.INGREDIENTS, ingredient._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.put(request, ingredient,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newIngredient = response.data as Ingredient;
        let index = this.ingredientList.indexOf(ingredient);
        if(index >= 0) {
          this.ingredientList[index] = newIngredient;
        }
        return response.data;
      });
  }

  /** Delete ingredient */
  removeIngredient(ingredient: Ingredient): Promise<any> {
    var request : string = 
        Util.getUrlForAction(Operations.INGREDIENTS, ingredient._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.delete(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let index = this.ingredientList.indexOf(ingredient);
        if(index >= 0) {
          this.ingredientList.splice(index, 1);
        }
        return response.data;
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