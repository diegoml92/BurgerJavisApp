import { Component } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

import { Util } from '../../app/util';
import { Category } from '../../app/category';
import { Summary } from '../../app/summary';
import { SummaryService } from '../../providers/summary.service';


@Component({
  templateUrl: 'summary.component.html'
})
export class SummaryComponent {

  summaryData : Summary;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
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
        let toast = this.toastCtrl.create
            (Util.getToastParams('No se pudieron obtener los datos'));
        toast.present();
      });
  }

  getCategoryIndex(category: Category): number {
    return this.summaryData.topCategories.indexOf(category);
  }

}