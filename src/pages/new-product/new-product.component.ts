import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../app/product';
import { ProductService } from '../../app/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'new-product.component.html'
})

export class NewProductComponent {

  productName : string;
  productPrice: number;
  newProductForm: FormGroup;

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
  	private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.newProductForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.maxLength(50), 
          Validators.pattern('[a-zA-ZñÑ][a-zA-ZñÑ ]*'),
          Validators.required
        ])
      ],
      price: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+([.,][0-9]+)?'),
          Validators.required
        ])
      ]
    });
  }

  onSubmit () {
      //TO-DO: Asynchronous validation.
      let product = new Product(this.productName, this.productPrice);
      this.productService.addProduct(product);
      this.navCtrl.popToRoot();
  }

}