import { Component } from '@angular/core';

import { NavController, NavParams,
  AlertController, ToastController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../app/ingredient.service';

@Component({
  templateUrl: 'ingredient-details.component.html'
})
export class IngredientDetailsComponent {

  ingredient: Ingredient;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ingredientService: IngredientService
  ) {
    this.ingredient = this.navParams.get('ingredient');
  }

  removeIngredient() {
    this.ingredientService.removeIngredient(this.ingredient);
    this.navCtrl.pop();
  }

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
            this.removeIngredient();
          }
        }
      ]
    });
    confirm.present();
  }

  showInputDialog() {
    let alert = this.alertCtrl.create({
    title: 'Modificar precio',
    inputs: [
      {
        name: 'extraPrice',
        placeholder: this.ingredient.extraPrice.toString(),
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          // No further action
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          if(data.extraPrice > 0) {
            this.ingredient.extraPrice = data.extraPrice;
          } else {
            let toast = this.toastCtrl.create({
              message: 'El valor introducido no es válido',
              duration: 3000,
              position: 'bottom'
            });

            toast.present();
          }
        }
      }
    ]
  });
  alert.present();
  }

}