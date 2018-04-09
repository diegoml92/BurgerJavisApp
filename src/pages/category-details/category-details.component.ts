import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
  LoadingController, ToastController } from 'ionic-angular';

import { Category } from '../../app/category';
import { CategoryService } from '../../providers/category.service';

@Component({
  templateUrl: 'category-details.component.html'
})
export class CategoryDetailsComponent {

  category: Category;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private categoryService: CategoryService
  ) {
    this.category = this.navParams.get('category');
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