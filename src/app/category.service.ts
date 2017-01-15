import { Category } from './category';
import { CATEGORIES } from './mock-data';

const MAX_FAVS = 3;

export class CategoryService {

  categoryList: Category[];

  constructor() {
    this.categoryList = [];

    for(let i = 0; i < CATEGORIES.length; i++) {
      this.categoryList.push(CATEGORIES [i]);
    }
  }

  getCategoryList(): Promise<Category[]> {
    return new Promise(resolve => {
      // Simulate server latency (1.5s)
      setTimeout(() => resolve(this.categoryList), 1500);
    });
  }

  addCategory(category: Category) {
    this.categoryList.push(category);
  }

  removeCategory(category: Category) {
    let index = this.categoryList.indexOf(category);
    if(index => 0) {
      this.categoryList.splice(index, 1);
    }
  }

  updateCategoryIcon(category: Category, icon: string) {
    let index = this.categoryList.indexOf(category);
    if(index => 0) {
      setTimeout(() => this.categoryList[index].icon = icon, 1500);
      return Promise.resolve();
    }
    return Promise.reject({error: "Categoría no existente"});
  }

  getNumberOfFavorites(): number {
    let favs = 0;
    for(let i=0; i<this.categoryList.length; i++) {
      if(this.categoryList[i].favorite) {
        favs++;
      }
    }
    return favs;
  }

  setFavorite(category: Category, value: boolean): Promise<any> {
    let index = this.categoryList.indexOf(category);
    if(index => 0) {
      if(value) {
        if(this.getNumberOfFavorites() < MAX_FAVS) {
          this.categoryList[index].favorite = value;
          return Promise.resolve(this.categoryList);
        }
        return Promise.reject({
          error: "Sólo se permiten " + MAX_FAVS + " categorías favoritas"
        });
      } else {
        this.categoryList[index].favorite = value;
        return Promise.resolve(this.categoryList);
      }
    }
    return Promise.reject({error: "Categoría no existente"});
  }

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
        //TO-DO: Server side validation to be done
        setTimeout(() => resolve(null), 1500);
      }
    });
  }

}