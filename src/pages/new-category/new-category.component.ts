import { Component } from '@angular/core';
import { FormGroup, FormBuilder, 
  Validators, FormControl } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { Category } from '../../app/category';
import { CategoryService } from '../../app/category.service';
import { DEFAULT_CATEGORY, CATEGORY_ICONS, CategoryIcon } from '../../app/commons';


@Component({
  templateUrl: 'new-category.component.html'
})
export class NewCategoryComponent {

  newCategoryForm: FormGroup;
  categoryName: string;
  categoryIcon: string = DEFAULT_CATEGORY.name;

  defaultCategory: CategoryIcon = DEFAULT_CATEGORY;
  categories: CategoryIcon[] = CATEGORY_ICONS;

  constructor(
    private navCtrl: NavController,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.newCategoryForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.maxLength(50), 
          Validators.pattern('[a-zA-ZñÑ0-9][a-zA-ZñÑ 0-9]*'),
          Validators.required
        ]),
        this.categoryValidation.bind(this)
      ],
      icon: ['']
    });
  }

  categoryValidation(formControl: FormControl): Promise<any> {
    return this.categoryService.checkCategoryName(formControl.value);
  }

  onSubmit() {
    let category = new Category(this.categoryName, this.categoryIcon, false);
    this.categoryService.addCategory(category);
    this.navCtrl.pop();
  }

}