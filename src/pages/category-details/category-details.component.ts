import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
  LoadingController, ToastController } from 'ionic-angular';

import { Util } from '../../app/util';

import { Category } from '../../app/category';
import { CategoryService } from '../../providers/category.service';

@Component({
  templateUrl: 'category-details.component.html'
})
export class CategoryDetailsComponent {

  category: Category;
  modified: boolean = false;

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

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando categoría..."
    });
    loading.present();
    this.categoryService.getCategory(this.category)
      .then(category => {
        this.category = category;
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al obtener la categoría'));
        toast.present();
        this.navCtrl.popToRoot();
      });
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
      })
      .catch(err => {
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al actualiar el producto'));
        loading.dismiss();
        toast.present();
      });
  }

  updateName() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo nombre',
      inputs: [
        {
          name: 'name',
          placeholder: this.category.name,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Actualizar',
          handler: data => {
            this.categoryService.checkCategoryName(data.name)
              .then (result => {
                if (result === null) {
                  this.category.name = data.name;
                  this.modified = true;
                } else {
                  let toast = this.toastCtrl.create
                      (Util.getToastParams('Este nombre ya está siendo usado'));
                  toast.present();
                }
              });
          }
        }
      ]
    });
    alert.present();
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
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al borrar la categoría'));
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