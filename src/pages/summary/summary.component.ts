import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'summary.component.html'
})
export class SummaryComponent {

  income : number;
  completedOrders: number;
  categories : Array<{name:string, products:Array<{name:string,amount:number}>}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.income = 321.55;
    this.completedOrders = 28;

    this.categories = [
        { name: "Bebida",
          products: [
            {name:"Agua", amount: 8},
            {name:"CocaCola", amount: 12},
            {name:"Cerveza", amount: 7}]},
        { name: "Comida",
          products: [
            {name:"Hamburgesa", amount: 9},
            {name:"Sandwich", amount: 9}]}];

  }

}