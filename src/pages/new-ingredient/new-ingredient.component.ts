import { Component } from '@angular/core';
import { FormGroup, FormBuilder, 
  Validators, FormControl } from '@angular/forms';

import { Util } from '../../app/util';

import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../providers/ingredient.service';

@Component({
  templateUrl: 'new-ingredient.component.html'
})
export class NewIngredientComponent {

  newIngredientForm: FormGroup;
  ingredientName: string;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder
  ) {
    this.newIngredientForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.maxLength(50), 
          Validators.pattern('[a-zA-ZñÑ][a-zA-ZñÑ ]*'),
          Validators.required
        ]),
        this.ingredientValidation.bind(this)
      ]
    });
  }

  ingredientValidation(formControl: FormControl): Promise<any> {
    return this.ingredientService.checkIngredientName(formControl.value);
  }

  onSubmit() {
    let ingredient = new Ingredient(this.ingredientName);
    let loading = this.loadingCtrl.create({
      content: "Creando ingrediente..."
    });
    loading.present();   
    this.ingredientService.addIngredient(ingredient)
      .then(() => {
        loading.dismiss();
        this.navCtrl.pop()
      })
      .catch(() => {
        loading.dismiss();
        let toast = this.toastCtrl.create
            (Util.getToastParams('Error al crear el ingrediente'));
        toast.present();
      });
  }

}