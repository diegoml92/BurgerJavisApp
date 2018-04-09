import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { Product } from '../../app/product';
import { ProductService } from '../../providers/product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: 'new-product.component.html'
})

export class NewProductComponent {

  productName : string;
  productPrice: number;
  newProductForm: FormGroup;

  constructor(
  	private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
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
        ]),
        this.productValidation.bind(this)
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

  productValidation(formControl: FormControl): Promise<any> {
    return this.productService.checkProductName(formControl.value);
  }

  onSubmit () {
    let product = new Product(this.productName, this.productPrice);
    let loading = this.loadingCtrl.create({
      content: "Creando producto..."
    });
    loading.present(); 
    this.productService.addProduct(product)
      .then(() => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      })
      .catch(err => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al crear el producto',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

}