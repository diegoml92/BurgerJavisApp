import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController,
  AlertController, ToastController } from 'ionic-angular';

import { Util } from '../../app/util';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../providers/ingredient.service';

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
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al obtener el ingrediente'));
        toast.present();
        this.navCtrl.popToRoot();
      });
  }

  /** Update ingredient */
  updateIngredient() {
    let loading = this.loadingCtrl.create({
      content: "Actualizando ingrediente..."
    });
    loading.present();
    this.ingredientService.updateIngredient(this.ingredient)
      .then(() => {
        loading.dismiss();
        this.modified = false;
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al actualizar el ingrediente'));
        toast.present();
      });
  }

  updateName() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo nombre',
      inputs: [
        {
          name: 'name',
          placeholder: this.ingredient.name,
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
            this.ingredientService.checkIngredientName(data.name)
              .then (result => {
                if (result === null) {
                  this.ingredient.name = data.name;
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
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al borrar el ingrediente'));
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