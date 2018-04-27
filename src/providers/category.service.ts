import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Util } from '../app/util';
import { Operations } from '../app/commons';
import { Category } from '../app/category';
import { Credentials } from '../app/credentials';
import { AuthenticationManager } from './authentication-manager';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {

  categoryList: Category[];

  constructor(private http: HTTP, private auth: AuthenticationManager) {}

  /** Return category list */
  getCategoryList(): Promise<Category[]> {
    var request : string = Util.getUrlForAction(Operations.CATEGORIES);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null, 
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        this.categoryList = response.data as Category[];
        return this.categoryList;
      });
  }

  /** Return requested category */
  getCategory(category: Category): Promise<Category> {
    var request : string = Util.getUrlForAction(Operations.CATEGORIES, category._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        return response.data as Category;
      });
  }

  /** Create new category */
  addCategory(category: Category) {
    var request : string = Util.getUrlForAction(Operations.CATEGORIES);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.post(request, category,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newCategory = response.data as Category;
        this.categoryList.push(newCategory);
        return newCategory;
      });
  }

  /** Update category */
  updateCategory(category: Category): Promise<Category> {
    var request: string =
        Util.getUrlForAction(Operations.CATEGORIES, category._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.put(request, category,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let newCategory = response.data as Category;
        let index = this.categoryList.indexOf(category);
        if(index >= 0) {
          this.categoryList[index] = newCategory;
        }
        return response.data;
      });
  }

  /** Delete category */
  removeCategory(category: Category) {
    var request : string = 
        Util.getUrlForAction(Operations.CATEGORIES, category._id);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.delete(request, null, 
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        let index = this.categoryList.indexOf(category);
        if(index >= 0) {
          this.categoryList.splice(index, 1);
        }
        return response.data;
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