import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Util } from '../app/util';
import { Operations } from '../app/commons';
import { Category } from '../app/category';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {

  categoryList: Category[];

  constructor(private http: Http, private auth: AuthenticationManager) {}

  /** Return category list */
  getCategoryList(): Promise<Category[]> {
    var request : string = Util.getUrlForAction(Operations.CATEGORIES);
    return this.http.get(request,
        {headers: this.auth.generateAuthHeader()})
      .toPromise()
      .then(response => {
        this.categoryList = response.json() as Category[];
        return this.categoryList;
      });
  }

  /** Create new category */
  addCategory(category: Category) {
    var request : string = Util.getUrlForAction(Operations.CATEGORIES);
    return this.http.post(request, JSON.stringify(category), 
        {headers: this.auth.generateJsonAuthHeader()})
      .toPromise()
      .then(response => {
        let newCategory = response.json() as Category;
        this.categoryList.push(newCategory);
        return newCategory;
      });
  }

  /** Update category */
  updateCategory(category: Category): Promise<Category> {
    var request: string =
        Util.getUrlForAction(Operations.CATEGORIES, category._id);
    return this.http.put(request, JSON.stringify(category),
        {headers: this.auth.generateJsonAuthHeader()})
      .toPromise()
      .then(response => {
        let newCategory = response.json() as Category;
        let index = this.categoryList.indexOf(category);
        if(index >= 0) {
          this.categoryList[index] = newCategory;
        }
        return response.json();
      });
  }

  /** Delete category */
  removeCategory(category: Category) {
    var request : string = 
        Util.getUrlForAction(Operations.CATEGORIES, category._id);
    return this.http.delete(request,
        {headers: this.auth.generateAuthHeader()})
      .toPromise()
      .then(response => {
        let index = this.categoryList.indexOf(category);
        if(index >= 0) {
          this.categoryList.splice(index, 1);
        }
        return response.json();
      });
  }

  /** Category name validation */
  checkCategoryName(newCategoryName: string): Promise<any> {
    return new Promise(resolve => {
      let found = false;
      let i = 0;
      while(!found && i < this.categoryList.length) {
        found = this.categoryList[i].name.toLowerCase() ===
          newCategoryName.toLowerCase().trim();
        i++;
      }
      if(found) {
        resolve("Category name is taken");
      } else {
        resolve(null);
      }
    });
  }

}