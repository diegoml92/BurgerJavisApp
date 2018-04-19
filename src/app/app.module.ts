import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpBrowser } from '../browser/http-browser';

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
import { KitchenComponent } from '../pages/kitchen/kitchen.component';
import { KitchenDetailsComponent } from '../pages/kitchen-details/kitchen-details.component';
import { UserComponent } from '../pages/user/user.component';

import { OrderService } from '../providers/order.service';
import { KitchenService } from '../providers//kitchen.service';
import { ProductService } from '../providers//product.service';
import { IngredientService } from '../providers//ingredient.service';
import { CategoryService } from '../providers//category.service';
import { SummaryService } from '../providers//summary.service';
import { LoginService } from '../providers//login.service';
import { AuthenticationManager } from '../providers//authentication-manager';

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
    NewIngredientComponent,
    KitchenComponent,
    KitchenDetailsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
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
    NewIngredientComponent,
    KitchenComponent,
    KitchenDetailsComponent,
    UserComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP, useClass: HttpBrowser },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationManager,
    OrderService,
    KitchenService,
    ProductService,
    IngredientService,
    CategoryService,
    SummaryService,
    LoginService,
  ]
})
export class AppModule {}
