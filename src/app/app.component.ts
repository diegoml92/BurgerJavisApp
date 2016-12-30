import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OrdersComponent } from '../pages/orders/orders.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { SummaryComponent } from '../pages/summary/summary.component';


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {

  @ViewChild(Nav)
  nav: Nav;

  rootPage = OrdersComponent;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set app's pages
    this.pages = [
      { title: 'Pedidos', component: OrdersComponent},
      { title: 'Menú', component: MenuComponent},
      { title: 'Resumen', component: SummaryComponent}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }


}
