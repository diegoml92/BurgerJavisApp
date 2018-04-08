import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Headers } from '@angular/http';
import { Credentials } from '../app/credentials';
import { ROLE_ADMIN, ROLE_WAITER, OrderState, BASIC_PREFIX,
  JSON_HEADER_NAME, JSON_HEADER_VALUE } from '../app/commons';
import { Order } from '../app/order';
import { OrderItem } from '../app/order-item';
import { Category } from '../app/category';
import { Ingredient } from '../app/ingredient';
import { Product } from '../app/product';
import { Summary } from '../app/summary';

// APPLICATION MOCKS

export class LoginMock {
  login() {}
}

export class AuthMock {

  public static regularUser: Credentials = {
    username: "user1", password: "user1", roles: [ROLE_WAITER]
  };

  public static adminUser: Credentials = {
    username: "admin", password: "admin", roles: [ROLE_ADMIN]
  }

  public credentials: Credentials = AuthMock.regularUser;

  public setCredentials(credentials: Credentials) {
    this.credentials = credentials;
  }

  public isAdmin(): boolean {
    return this.credentials.roles.indexOf(ROLE_ADMIN) >= 0;
  }

  public getCredentials(): Credentials {
    return this.credentials;
  }

  public resetCredentials() {
    this.credentials = new Credentials();
  }

  public generateAuthHeader(): Headers {
    var ascii = this.credentials.username + ":" + this.credentials.password;
    return new Headers({'Authorization': BASIC_PREFIX + new Buffer(ascii).toString('base64')});
  }

  public generateJsonAuthHeader(): Headers {
    var ascii = this.credentials.username + ":" + this.credentials.password;
    var headers = new Headers();
    headers.append(JSON_HEADER_NAME, JSON_HEADER_VALUE);
    headers.append('Authorization', BASIC_PREFIX + new Buffer(ascii).toString('base64'));
    return headers;
  }
}

export class OrderMock {

  public orderList: Order[] = [];

  private static orderItemList1: OrderItem[] = [
    {product: new Product("Product1", 5.50), amount: 3},
    {product: new Product("Product2", 1.50), amount: 4}
  ];
  private static orderItemList2: OrderItem[] = [
    {product: new Product("Product2", 1.50), amount: 1}
  ];

  public static mockOrderList: Order[] = [
    new Order("Order1", "User1", OrderMock.orderItemList1, OrderState.INITIAL),
    new Order("Order2", "User1", OrderMock.orderItemList2, OrderState.KITCHEN),
    new Order("Order3", "User2", OrderMock.orderItemList1, OrderState.SERVED),
    new Order("Order4", "User1", OrderMock.orderItemList1, OrderState.INITIAL)
  ];

  public addOrder(order: Order): Promise<Order> {
    this.orderList.push(order);
    return new Promise<Order>((resolve) => {
      resolve(order);
    });
  }

  public checkOrderName(newOrderName: string): Promise<any> {
    return new Promise(resolve => {
      resolve(null);
    });
  }

  public getOrderList(): Promise<Order[]> {
    this.orderList = OrderMock.mockOrderList;
    return new Promise<Order[]>((resolve, reject) => {
      resolve(this.orderList);
    });
  }

  public removeOrder(order: Order): Promise<any> {
    let index = this.orderList.indexOf(order);
    if(index >= 0) {
      this.orderList.splice(index, 1);
    }
    return new Promise((resolve) => {
      resolve();
    });
  }

  public updateOrder(order: Order): Promise<Order> {
    return new Promise((resolve) => {
      resolve(order);
    });
  }

}

export class CategoryMock {

  public categoryList: Category[] = [];

  public static mockCategoryList: Category[] = [
    {name: "Category1", favorite: false},
    {name: "Category2", favorite: true},
    {name: "Category3", favorite: false}
  ];

  public getCategoryList(): Promise<Category[]> {
    this.categoryList = CategoryMock.mockCategoryList;
    return new Promise<Category[]>( (resolve, reject) => {
      resolve(this.categoryList);
    });
  }

  public addCategory(category: Category): Promise<Category> {
    this.categoryList.push(category);
    return new Promise<Category>((resolve) => {
      resolve(category);
    });
  }

  public removeCategory(category: Category): Promise<any> {
    let index = this.categoryList.indexOf(category);
    if(index >= 0) {
      this.categoryList.splice(index, 1);
    }
    return new Promise((resolve) => {
      resolve();
    });
  }

  public updateCategory(category: Category): Promise<Category> {
    return new Promise((resolve) => {
      resolve(category);
    });
  }

  public checkCategoryName(newCategoryName: string): Promise<any> {
    return new Promise(resolve => {
      resolve(null);
    });
  }

}

export class IngredientMock {

  public ingredientList: Ingredient[] = [];

  public static mockIngredientList: Ingredient[] = [
    {name: "Ingredient1"},
    {name: "Ingredient2"},
    {name: "Ingredient3"}
  ];

  public getIngredientList(): Promise<Ingredient[]> {
    this.ingredientList = IngredientMock.mockIngredientList;
    return new Promise<Ingredient[]>((resolve, reject) => {
      resolve(this.ingredientList);
    });
  }

  public addIngredient(ingredient: Ingredient): Promise<Ingredient> {
    this.ingredientList.push(ingredient);
    return new Promise<Ingredient>((resolve) => {
      resolve(ingredient);
    });
  }

  public removeIngredient(ingredient: Ingredient): Promise<any> {
    let index = this.ingredientList.indexOf(ingredient);
    if(index >= 0) {
      this.ingredientList.splice(index, 1);
    }
    return new Promise((resolve) => {
      resolve();
    });
  }

  public checkIngredientName(newIngredientName: string): Promise<any> {
    return new Promise(resolve => {
      resolve(null);
    });
  }

}

export class ProductMock {

  public productList: Product[] = [];

  public static mockProductList: Product[] = [
    {
      name: 'Product1',
      price: 5,
      category: {name: 'Category1', favorite: false},
      ingredients: [
        {name: 'Ingredient1'},
        {name: 'Ingredient2'},
        {name: 'Ingredient3'}
      ]
    },
    {
      name: 'Product2',
      price: 2.50,
      ingredients: []
    },
    {
      name: 'Product3',
      price: 3.2,
      ingredients: [
        {name: 'Ingredient3'}
      ]
    }

  ];

  public getProductList(): Promise<Product[]> {
    this.productList = ProductMock.mockProductList;
    return new Promise<Product[]>((resolve) => {
      resolve(this.productList);
    });
  }

  public addProduct(product: Product): Promise<Product> {
    this.productList.push(product);
    return new Promise<Product>((resolve) => {
      resolve(product);
    });
  }

  public removeProduct(product: Product): Promise<any> {
    let index = this.productList.indexOf(product);
    if(index >= 0) {
      this.productList.splice(index, 1);
    }
    return new Promise((resolve) => {
      resolve();
    });
  }

  public updateProduct(product: Product): Promise<Product> {
    return new Promise((resolve) => {
      resolve(product);
    });
  }

  public checkProductName(newProductName: string): Promise<any> {
    return new Promise(resolve => {
      resolve(null);
    });
  }

}

export class KitchenMock {

  private static orderItemList1: OrderItem[] = [
    {product: new Product("Product1", 5.50), amount: 3},
    {product: new Product("Product2", 1.50), amount: 4}
  ];
  private static orderItemList2: OrderItem[] = [
    {product: new Product("Product2", 1.50), amount: 1}
  ];

  public static mockOrderList: Order[] = [
    new Order("Order1", "User1", KitchenMock.orderItemList1),
    new Order("Order2", "User1", KitchenMock.orderItemList2),
    new Order("Order3", "User2", KitchenMock.orderItemList1),
    new Order("Order4", "User1", KitchenMock.orderItemList1)
  ];

  public getOrderList(): Promise<Order[]> {
    let orderList = KitchenMock.mockOrderList;
    return new Promise<Order[]>((resolve, reject) => {
      resolve(orderList);
    });
  }

  public updateOrder(order: Order): Promise<Order> {
    return new Promise((resolve) => {
      resolve(order);
    });
  }

}

export class SummaryMock {

  public summaryData: Summary;

  public static mockData: Summary =
  {
    profits: 135.45,
    completedOrders: 5,
    topCategories: CategoryMock.mockCategoryList,
    topProducts: [
      [
        {productName: 'TopProduct1', amount: 8},
        {productName: 'TopProduct2', amount: 5}
      ],
      [
        {productName: 'TopProduct3', amount: 7}
      ],
      [
        {productName: 'TopProduct4', amount: 4},
        {productName: 'TopProduct5', amount: 3},
        {productName: 'TopProduct6', amount: 3}
      ]
    ]
  };

  public getSummaryData(): Promise<Summary> {
    this.summaryData = SummaryMock.mockData;
    return new Promise (resolve => {
      resolve(this.summaryData);
    });
  }

}

// IONIC MOCKS

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {
 
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }
 
  public setRoot(): any {
    return true;
  }

  public popToRoot(): any {
    return ;
  }

  public registerChildNav(nav: any): void {
    return ;
  }

}

export class NavParamsMock {

  static returnParam = null;

  public get(key: string): any {
    return NavParamsMock.returnParam;
  }

  static setParams(value: any){
    NavParamsMock.returnParam = value;
  }

}

class LoadingMock {

  private content: string;

  constructor (loadingMock: LoadingMock) {
    this.content = loadingMock.content;
  }

  public present(): void {
    console.debug('LoadingMock : present');
  }

  public dismiss(): void {
    console.debug('LoadingMock : dismiss');
  }

}

export class LoadingControllerMock {

  public create(loadingMock: LoadingMock): LoadingMock {
    return new LoadingMock(loadingMock);
  }

}

class ToastMock {

  private message: string;
  private duration: number;
  private position: string;

  constructor (toastMock: ToastMock) {
    this.message = toastMock.message;
    this.duration = toastMock.duration;
    this.position = toastMock.position;
  }

  public present(): void {
    console.debug('ToastMock : present');
  }
}

export class ToastControllerMock {

  public create(toastMock: ToastMock): ToastMock {
    return new ToastMock(toastMock);
  }

}

class AlertMock {

  private title: string;
  private message: string;
  private buttons: any;

  constructor(alertMock: AlertMock) {
    this.title = alertMock.title;
    this.message = alertMock.message;
    this.buttons = alertMock.buttons;
  }

  public present(): void {
    console.debug('AlertMock : present');
    AlertControllerMock.acceptFunction();
  }

}

export class AlertControllerMock {

  static acceptFunction = null;

  public create(alertMock: AlertMock): AlertMock {
    return new AlertMock(alertMock);
  }

  public static setCallback(callback): void {
    this.acceptFunction = callback;
  }

}

export class MenuControllerMock {

  public enable(enable: boolean, param: string): void {}

}

export class ViewMock {}
