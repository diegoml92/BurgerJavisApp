import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { Util } from '../../app/util';

import { Category } from '../../app/category';
import { CategoryService } from '../../providers/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  templateUrl: 'categories.component.html'
})
export class CategoriesComponent {

  categories: Category[];

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private categoryService: CategoryService) {}

  ionViewWillLoad() {
    let loading = this.loadingCtrl.create({
      content: "Cargando categorías..."
    });
    loading.present();
    this.categoryService.getCategoryList()
      .then(categories => {
        this.categories = categories;
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create
          (Util.getToastParams('Error al solicitar las categorías'));
        toast.present();
        this.navCtrl.popToRoot();
      });
  }

  categoryTapped(category: Category) {
    this.navCtrl.push(CategoryDetailsComponent, { category: category});
  }

  addCategory () {
    this.navCtrl.push(NewCategoryComponent);
  }

  isFavorite(category: Category): boolean {
    return category.favorite;
  }

  setFavorite(event, category: Category, value: boolean) {
    event.stopPropagation();
    category.favorite = value;
    let loading = this.loadingCtrl.create({
      content: "Actualizando favoritos..."
    });
    loading.present();
    this.categoryService.updateCategory(category)
      .then(result => {
        loading.dismiss();
        let index = this.categories.indexOf(result);
        if(index >= 0) {
          this.categories[index] = result;
        }
      })
      .catch(error => {
        loading.dismiss();
        category.favorite = !value;
        let toast = this.toastCtrl.create
          (Util.getToastParams('Se ha alcanzado el número máximo de favoritos'));
        toast.present();
      });
  }

}