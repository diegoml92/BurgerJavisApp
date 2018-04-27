import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderService } from '../../providers/order.service';
import { ProductService } from '../../providers/product.service';
import { NavMock, NavParamsMock, OrderMock, 
  ProductMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: OrderDetailsComponent;
let fixture: ComponentFixture<OrderDetailsComponent>;
let de, de2: DebugElement;
 
describe('Component: OrderDetails Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, OrderDetailsComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: NavParams,
          useClass: NavParamsMock
        },
        {
          provide: OrderService,
          useClass: OrderMock
        },
        {
          provide: ProductService,
          useClass: ProductMock
        },
        {
          provide: LoadingController,
          useClass: LoadingControllerMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      NavParamsMock.setParams(OrderMock.mockOrderList[0]);

      fixture = TestBed.createComponent(OrderDetailsComponent);
      comp    = fixture.componentInstance;

    });
 
  }));
 
  afterEach(() => {

    fixture.destroy();
    comp = null;

  });
 
  it('is created', () => {
 
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
 
  });

  it('should display OrderDetails view correctly', () => {

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain(OrderMock.mockOrderList[0].name);

    de = fixture.debugElement.query(By.css('ion-title ion-icon'));

    expect(de).toBeNull();

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();

    // product list
    de = fixture.nativeElement.querySelectorAll('ion-item');
    de2 = fixture.nativeElement.querySelectorAll('.amount-button');
    comp.order.items.forEach((orderItem, i) => {

      let item = de[i];
      expect(item.textContent).toContain(orderItem.product.name);
      expect(item.innerHTML).toContain('remove-circle');

      let amountButton = de2[i];
      expect(amountButton.textContent).toContain(orderItem.amount);
      expect(amountButton.disabled).toBeFalsy();

    });

    de = fixture.debugElement.query(By.css('.send-kitchen-button'));

    expect(de).not.toBeNull();
    let el = de.nativeElement;
    expect(el.textContent).toContain('Enviar a cocina');

    de = fixture.debugElement.query(By.css('ion-fab'));

    expect(de).not.toBeNull();

    de = fixture.debugElement.query(By.css('.finish-button'));

    expect(de).toBeNull();

  });

  it('should disable edition when order state is not "initial"', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain(OrderMock.mockOrderList[0].name);

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();

    // product list
    de = fixture.nativeElement.querySelectorAll('ion-item');
    de2 = fixture.nativeElement.querySelectorAll('.amount-button');
    comp.order.items.forEach((orderItem, i) => {

      let item = de[i];
      expect(item.textContent).toContain(orderItem.product.name);
      expect(item.innerHTML).not.toContain('remove-circle');

      let amountButton = de2[i];
      expect(amountButton.textContent).toContain(orderItem.amount);
      expect(amountButton.disabled).toBeTruthy();

    });

    de = fixture.debugElement.query(By.css('.send-kitchen-button'));

    expect(de).toBeNull();

    de = fixture.debugElement.query(By.css('ion-fab'));

    expect(de).toBeNull();

  });

  it('should show "save" button when changes are made to the order', () => {

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    fixture.detectChanges();

    expect(comp.modified).toBeFalsy();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).toBeNull();

    let aux = fixture.debugElement.query(By.css('.amount-button'));

    aux.triggerEventHandler('click', null);

    expect(comp.modified).toBeTruthy();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).not.toBeNull();

  });

  it('should display state icon when state is "kitchen" or "served"', () => {

    de = fixture.debugElement.query(By.css('ion-title ion-icon'));
    expect(de).toBeNull();

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isServed').and.returnValue(true);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-title ion-icon'));
    expect(de).not.toBeNull();

    de = fixture.debugElement.query(By.css('ion-title'));
    let icon = de.nativeElement;
    expect(icon.innerHTML).toContain('log-out');

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isKitchen').and.returnValue(true);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-title ion-icon'));
    expect(de).not.toBeNull();

    de = fixture.debugElement.query(By.css('ion-title'));
    icon = de.nativeElement
    expect(icon.innerHTML).toContain('log-in');

    de = fixture.debugElement.query(By.css('div em'));
    let el = de.nativeElement;

    expect(el.textContent).toContain('El pedido está siendo preparado');

  });

  it('should show "finish" button when state is served', () => {

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isServed').and.returnValue(true);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.finish-button'));

    expect(de).not.toBeNull();
    let button = de.nativeElement;

    expect(button.textContent).toContain('Finalizar pedido');

  });

  it('should call "deleteOrder" when "delete" button is clicked', () => {

    spyOn(comp, 'deleteOrder');

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();
    de.triggerEventHandler('click', null);
    expect(comp.deleteOrder).toHaveBeenCalled();

  });

  it('should call "pop" when removing an Order', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'popToRoot');

    comp.removeOrder();

    tick();

    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should increase item amount when "amount" button is clicked', () => {

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('.amount-button'))[0];
    let button = de.nativeElement;

    let currentAmount = comp.order.items[0].amount;
    expect(button.textContent).toContain(currentAmount);

    de.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(comp.order.items[0].amount).toEqual(currentAmount + 1);
    expect(button.textContent).toContain(currentAmount + 1);

  });

  it('should decrease item amount when "decrease" button is clicked', () => {

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('.decrease-button'))[0];
    de2 = fixture.debugElement.queryAll(By.css('.amount-button'))[0];
    let amountButton = de2.nativeElement;

    let currentAmount = comp.order.items[0].amount;
    expect(amountButton.textContent).toContain(currentAmount);

    de.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(comp.order.items[0].amount).toEqual(currentAmount - 1);
    expect(amountButton.textContent).toContain(currentAmount - 1);

  });

  it('should delete item when "decrease" button is clicked and amount is equal to 0', () => {

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('.decrease-button'))[1];
    let currentItems = comp.order.items.length;

    let times = comp.order.items[1].amount;
    for(let i = 0; i < times; i++) {
      de.triggerEventHandler('click', null);
    }

    expect(comp.order.items.length).toEqual(currentItems - 1);

  });

  it('should call "updateOrder" when "send kitchen" button is clicked', fakeAsync(() => {

    let orderService = fixture.debugElement.injector.get(OrderService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    spyOn(comp, 'sendToKitchenConfirmation');
    spyOn(orderService, 'updateOrder').and.returnValue(Promise.resolve(comp.order));
    spyOn(navCtrl, 'popToRoot');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.send-kitchen-button'));
    de.triggerEventHandler('click', null);

    expect(comp.sendToKitchenConfirmation).toHaveBeenCalled();

    comp.updateOrder(true);
    expect(orderService.updateOrder).toHaveBeenCalledWith(comp.order);

    tick();

    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should call "updateOrder" when "save" button is clicked', fakeAsync(() => {

    let orderService = fixture.debugElement.injector.get(OrderService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    spyOn(comp, 'updateOrder').and.callThrough();
    spyOn(orderService, 'updateOrder').and.returnValue(Promise.resolve(comp.order));
    spyOn(navCtrl, 'popToRoot');

    fixture.detectChanges();

    let aux = fixture.debugElement.query(By.css('.amount-button'));
    aux.triggerEventHandler('click', null);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    expect(comp.updateOrder).toHaveBeenCalledWith();
    expect(orderService.updateOrder).toHaveBeenCalledWith(comp.order);

    tick();

    expect(navCtrl.popToRoot).not.toHaveBeenCalled();

  }));

  it('should call "updateOrder" when "finish" button is clicked', fakeAsync(() => {

    let orderService = fixture.debugElement.injector.get(OrderService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isServed').and.returnValue(true);

    spyOn(comp, 'finishOrderConfirmation');
    spyOn(orderService, 'updateOrder').and.returnValue(Promise.resolve(comp.order));
    spyOn(navCtrl, 'popToRoot');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.finish-button'));
    de.triggerEventHandler('click', null);

    expect(comp.finishOrderConfirmation).toHaveBeenCalled();

    comp.updateOrder(true);
    expect(orderService.updateOrder).toHaveBeenCalledWith(comp.order);

    tick();

    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should launch "PopoverList" when add button is clicked', () => {

    let productService = fixture.debugElement.injector.get(ProductService);

    // Workaround, enum type is not working in tests
    spyOn(comp, 'isInitial').and.returnValue(true);

    spyOn(comp, 'addProduct').and.callThrough();
    spyOn(productService, 'getProductList');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-fab button'));
    de.triggerEventHandler('click', null);

    expect(comp.addProduct).toHaveBeenCalled();
    expect(productService.getProductList).toHaveBeenCalled();

  });

  it('should display a message when the order is empty', () => {

    comp.order.items = [];

    fixture.detectChanges()
    de = fixture.debugElement.query(By.css('div em'));

    expect(de).not.toBeNull();
    let el = de.nativeElement;
    expect(el.textContent).toContain('El pedido está vacío');

  });

});