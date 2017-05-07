import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
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
import { CategoriesComponent } from '../pages/categories/categories.component';
import { NewCategoryComponent } from '../pages/new-category/new-category.component';
import { CategoryDetailsComponent } from '../pages/category-details/category-details.component';
import { NewIngredientComponent } from '../pages/new-ingredient/new-ingredient.component';

import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { IngredientService } from './ingredient.service';
import { CategoryService } from './category.service';
import { SummaryService } from './summary.service';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    IngredientDetailsComponent,
    CategoriesComponent,
    NewCategoryComponent,
    CategoryDetailsComponent,
    NewIngredientComponent
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    LoginComponent,
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
    IngredientDetailsComponent,
    CategoriesComponent,
    NewCategoryComponent,
    CategoryDetailsComponent,
    NewIngredientComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderService,
    ProductService,
    IngredientService,
    CategoryService,
    SummaryService,
    LoginService
  ]
})
export class AppModule {}
