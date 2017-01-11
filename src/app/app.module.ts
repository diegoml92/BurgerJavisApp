import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AppComponent } from './app.component';
import { OrdersComponent } from '../pages/orders/orders.component';
import { OrderDetailsComponent } from '../pages/order-details/order-details.component';
import { PopoverListComponent } from '../pages/order-details/popover-list.component';
import { NewOrderComponent } from '../pages/new-order/new-order.component';
import { MenuComponent, PopoverPage } from '../pages/menu/menu.component';
import { NewProductComponent } from '../pages/new-product/new-product.component';
import { ProductDetailsComponent } from '../pages/product-details/product-details.component';
import { SummaryComponent } from '../pages/summary/summary.component';
import { IngredientsComponent } from '../pages/ingredients/ingredients.component';
import { IngredientDetailsComponent } from '../pages/ingredient-details/ingredient-details.component';

import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { IngredientService } from './ingredient.service';

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
    PopoverListComponent,
    IngredientsComponent,
    PopoverPage,
    IngredientDetailsComponent
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
    PopoverListComponent,
    IngredientsComponent,
    PopoverPage,
    IngredientDetailsComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderService,
    ProductService,
    IngredientService
  ]
})
export class AppModule {}
