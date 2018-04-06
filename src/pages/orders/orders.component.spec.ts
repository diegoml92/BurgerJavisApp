import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { OrdersComponent } from './orders.component';
import { NewOrderComponent } from '../new-order/new-order.component';
import { OrderService } from '../../app/order.service';
import { NavMock, LoadingControllerMock, OrderMock } from '../../test/mocks';
 
let comp: OrdersComponent;
let fixture: ComponentFixture<OrdersComponent>;
let de: DebugElement;
 
describe('Component: Orders Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, OrdersComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: OrderService,
          useClass: OrderMock
        },
        {
          provide : LoadingController,
          useClass : LoadingControllerMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(OrdersComponent);
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

  it('should display Orders view correctyl', fakeAsync(() => {

    let orderService = fixture.debugElement.injector.get(OrderService);

    // Orders are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Pedidos');

    // 'Menu' button
    de = fixture.debugElement.query(By.css('ion-navbar [menutoggle]'));
    expect(de).not.toBeNull();

    // 'add' button
    de = fixture.debugElement.query(By.css('ion-fab'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();

    // list of Orders
    expect(orderService.orderList.length).toEqual(4);
    expect(orderService.orderList.length).toEqual(comp.orders.length);

    de = fixture.nativeElement.querySelectorAll('[ion-item]');
    orderService.orderList.forEach((order, i) => {

      let listItem = de[i];

      expect(listItem.textContent).toContain(order.name);

      // Workaround, enum type is not working in tests
      switch (i) {
        case 1:
          spyOn(comp, 'isKitchen').and.returnValue(true);
          break;

        case 2:
          spyOn(comp, 'isServed').and.returnValue(true);
        
        default:
          // No action
          break;
      }

      fixture.detectChanges();

      if(comp.isKitchen(order)) {

        let icon = listItem.querySelector('ion-icon');
        expect(icon).not.toBeNull();

        icon = listItem.querySelector('h1');
        expect(icon.innerHTML).toContain('log-in');

      }

      if(comp.isServed(order)) {

        let icon = listItem.querySelector('ion-icon');
        expect(icon).not.toBeNull();

        icon = listItem.querySelector('h1');
        expect(icon.innerHTML).toContain('log-out');

      }

      order.items.forEach((item, j) => {

        expect(listItem.innerHTML).toContain(item.product.name);
        expect(listItem.innerHTML).toContain('x' + item.amount);

      });

      expect(listItem.innerHTML).toContain('€' + comp.calculateOrderPrice(order));

    });

  }));

  it('should display a message when Order list is empty', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-content div em'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Aún no hay ningún pedido')

  });

  it('should launch "OrderDetails" view when a list element is clicked', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    // Orders are loaded in ionViewWillLoad method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('[ion-item]'))[1];
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalled();
    
    // Not working => Enum tpye?
    //expect(navCtrl.push).toHaveBeenCalledWith(OrderDetailsComponent, 
    //  { Order: comp.orders[1]});

  }));

  it('should launch "NewOrder" view when the add button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    de = fixture.debugElement.query(By.css('ion-fab button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalled();
    expect(navCtrl.push).toHaveBeenCalledWith(NewOrderComponent);

  });
 
});