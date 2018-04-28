import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController,
  AlertController, ToastController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../providers/ingredient.service';

@Component({
  templateUrl: 'ingredient-details.component.html'
})
export class IngredientDetailsComponent {

  ingredient: Ingredient;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private ingredientService: IngredientService
  ) {
    this.ingredient = this.navParams.get('ingredient');
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando ingrediente..."
    });
    loading.present();
    this.ingredientService.getIngredient(this.ingredient)
      .then(ingredient => {
        this.ingredient = ingredient;
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al obtener el ingrediente',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.popToRoot();
      });
  }

  /** Remove ingredient */
  removeIngredient() {
    let loading = this.loadingCtrl.create({
      content: "Borrando ingrediente..."
    });
    loading.present();
    this.ingredientService.removeIngredient(this.ingredient)
      .then(() => {
        loading.dismiss();
        this.navCtrl.pop();
      })
      .catch(() => {
        let toast = this.toastCtrl.create({
          message: 'Error al borrar el ingrediente',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss()
      });
  }

  /** Ask for confirmation in order to remove ingredient */
  deleteIngredient() {
    let confirm = this.alertCtrl.create({
      title: '¿Borrar ' + this.ingredient.name + '?',
      message: '¿Estás seguro de que quieres eliminar este ingrediente? ' +
        'Se perderá toda la información relacionada él...',
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
            this.removeIngredient()
          }
        }
      ]
    });
    confirm.present();
  }

}