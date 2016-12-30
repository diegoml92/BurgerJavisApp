import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AppComponent } from './app.component';
import { OrdersComponent } from '../pages/orders/orders.component'
import { OrderDetailsComponent, PopoverList2 } from '../pages/order-details/order-details.component';
import { NewOrderComponent } from '../pages/new-order/new-order.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { NewProductComponent } from '../pages/new-product/new-product.component';
import { ProductDetailsComponent, PopoverList } from '../pages/product-details/product-details.component'
import { SummaryComponent } from '../pages/summary/summary.component'

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderDetailsComponent,
    NewOrderComponent,
    MenuComponent,
    NewProductComponent,
    ProductDetailsComponent,
    SummaryComponent,
    PopoverList,
    PopoverList2
  ],
  imports: [
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    OrdersComponent,
    OrderDetailsComponent,
    NewOrderComponent,
    MenuComponent,
    NewProductComponent,
    ProductDetailsComponent,
    SummaryComponent,
    PopoverList,
    PopoverList2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
