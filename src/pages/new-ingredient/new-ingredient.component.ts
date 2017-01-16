import { Component } from '@angular/core';
import { FormGroup, FormBuilder, 
  Validators, FormControl } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../app/ingredient.service';

@Component({
  templateUrl: 'new-ingredient.component.html'
})
export class NewIngredientComponent {

  newIngredientForm: FormGroup;
  ingredientName: string;
  ingredientPrice: number;

  constructor(
    private navCtrl: NavController,
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
      ],
      extraPrice: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+([.,][0-9]+)?'),
          Validators.required
        ])
      ]
    });
  }

  ingredientValidation(formControl: FormControl): Promise<any> {
    return this.ingredientService.checkIngredientName(formControl.value);
  }

  onSubmit() {
    let ingredient = new Ingredient(this.ingredientName, this.ingredientPrice);
    this.ingredientService.addIngredient(ingredient);
    this.navCtrl.pop();
  }

}