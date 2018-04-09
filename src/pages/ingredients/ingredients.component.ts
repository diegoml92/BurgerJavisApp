import { Component } from '@angular/core';

import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../providers/ingredient.service';
import { IngredientDetailsComponent } from 
  '../ingredient-details/ingredient-details.component';
import { NewIngredientComponent } from 
  '../new-ingredient/new-ingredient.component';

@Component({
  templateUrl: 'ingredients.component.html'
})
export class IngredientsComponent {

  ingredients: Ingredient[];

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private ingredientService: IngredientService,
    private navCtrl: NavController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando ingredientes..."
    });
    loading.present();
    this.ingredientService.getIngredientList()
      .then(ingredients => {
        this.ingredients = ingredients;
        loading.dismiss();
      })
      .catch(() => {
        let toast = this.toastCtrl.create({
          message: 'Error al solicitar los ingredientes',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss();
      });
  }

  addIngredient () {
    this.navCtrl.push(NewIngredientComponent);
  }

  ingredientTapped(ingredient: Ingredient) {
    this.navCtrl.push(IngredientDetailsComponent, {
      ingredient: ingredient
    });
  }

}