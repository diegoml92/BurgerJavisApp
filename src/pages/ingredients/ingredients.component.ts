import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../app/ingredient.service';
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
    private ingredientService: IngredientService,
    private navCtrl: NavController,
    private navParams: NavParams) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando ingredientes..."
    });
    loading.present();
    this.ingredientService.getIngredientList()
      .then(ingredients => {
        this.ingredients = ingredients;
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