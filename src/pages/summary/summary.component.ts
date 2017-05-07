import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Category } from '../../app/category';
import { Summary } from '../../app/summary';
import { SummaryService } from '../../app/summary.service';


@Component({
  templateUrl: 'summary.component.html'
})
export class SummaryComponent {

  summaryData : Summary;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private summaryService: SummaryService) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: "Cargando datos..."
    });
    loading.present();
    this.summaryService.getSummaryData()
      .then(data => {
        this.summaryData = data;
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
      });
  }

  getCategoryIndex(category: Category): number {
    return this.summaryData.topCategories.indexOf(category);
  }

}