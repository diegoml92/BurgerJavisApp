import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NavController, NavParams, AlertController,
  LoadingController, ToastController } from 'ionic-angular';

import { Category } from '../../app/category';
import { CategoryService } from '../../app/category.service';
import { DEFAULT_CATEGORY, CATEGORY_ICONS, CategoryIcon } from '../../app/commons';

@Component({
  templateUrl: 'category-details.component.html'
})
export class CategoryDetailsComponent {

  category: Category;
  categoryForm: FormGroup;
  categoryIcon: string;

  defaultCategory: CategoryIcon = DEFAULT_CATEGORY;
  categories: CategoryIcon[] = CATEGORY_ICONS;

  modified: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.category = this.navParams.get('category');
    this.categoryIcon = this.category.icon;
    this.categoryForm = this.formBuilder.group({
      icon: ['']
    });
  }

  updateCategoryIcon() {
    if(!(this.category.icon === this.categoryIcon)) {
      this.category.icon = this.categoryIcon;
      this.modified = true;
     }
  }

  /** Update category */
  updateCategory() {
    let loading = this.loadingCtrl.create({
      content: "Actualizando categoría..."
    });
    loading.present();
    this.categoryService.updateCategory(this.category)
      .then(() => {
        loading.dismiss();
        this.modified = false;
        this.navCtrl.pop();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Error al actualiar el ingrediente',
          duration: 3000,
          position: 'bottom'
        })
        loading.dismiss();
        toast.present();
      });
  }

  removeCategory() {
    let loading = this.loadingCtrl.create({
      content: "Borrando categoría..."
    });
    loading.present();
    this.categoryService.removeCategory(this.category)
      .then(() => {
        loading.dismiss();
        this.navCtrl.pop();
      })
      .catch(() => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al borrar la categoría',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  deleteCategory() {
    let confirm = this.alertCtrl.create({
      title: '¿Borrar ' + this.category.name + '?',
      message: '¿Estás seguro de que quieres eliminar esta categoría? ' +
        'Se perderá toda la información relacionada ella...',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // No further action
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.removeCategory();
          }
        }
      ]
    });
    confirm.present();
  }

}