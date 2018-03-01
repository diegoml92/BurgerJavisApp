import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController,
  AlertController, ToastController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../app/ingredient.service';

@Component({
  templateUrl: 'ingredient-details.component.html'
})
export class IngredientDetailsComponent {

  ingredient: Ingredient;
  modified: boolean = false;

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