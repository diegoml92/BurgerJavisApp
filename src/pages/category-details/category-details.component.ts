import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
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
      this.categoryService.updateCategoryIcon(this.category, this.categoryIcon);
     }
  }

  removeCategory() {
    this.categoryService.removeCategory(this.category);
    this.navCtrl.pop();
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