import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { KitchenComponent } from './kitchen.component';
import { KitchenDetailsComponent } from '../kitchen-details/kitchen-details.component';
import { NavMock, KitchenMock, LoadingControllerMock } from '../../test/mocks';

import { OrderService } from '../../providers/order.service';
 
let comp: KitchenComponent;
let fixture: ComponentFixture<KitchenComponent>;
let de: DebugElement;
 
describe('Component: Kitchen Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, KitchenComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: OrderService,
          useClass: KitchenMock
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

      fixture = TestBed.createComponent(KitchenComponent);
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

  it('should display Kitchen view correctyl', fakeAsync(() => {

    // Orders are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;
    expect(title.textContent).toContain('Comandas');

    // 'Menu' button
    de = fixture.debugElement.query(By.css('ion-navbar [menutoggle]'));
    expect(de).not.toBeNull();

    // list of orders
    expect(comp.orders.length).toEqual(KitchenMock.mockOrderList.length);

    de = fixture.nativeElement.querySelectorAll('ion-col');
    comp.orders.forEach((order, i) => {

      let listItem = de[i];

      expect(listItem.textContent).toContain(order.name);
      
      comp.orders[i].items.forEach((item, j) => {

        expect(listItem.innerHTML).toContain(item.product.name);
        expect(listItem.innerHTML).toContain('x' + item.amount);

      });

      expect(listItem.innerHTML).toContain('ion-button');
      expect(listItem.textContent).toContain('Servir');

    });

  }));

  it('should display a message when order list is empty', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div em'));
    let el = de.nativeElement;

    expect(el.textContent).toContain('Aún no hay ninguna comanda');

  });

  it('should launch "KitchenDetails" view when a list element is clicked', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    // Orders are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('ion-col [ion-item]'))[2];
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalledWith(KitchenDetailsComponent,
      { order: comp.orders[2] });

  }));

  it('should call serveOrder when "Serve" button is clicked', fakeAsync (() => {

    spyOn(comp, 'serveOrder');

    // Orders are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('ion-col [ion-button]'))[2];
    de.triggerEventHandler('click', null);

    expect(comp.serveOrder).toHaveBeenCalledWith(comp.orders[2]);

  }));

  it('should call "setRoot" when order is served', fakeAsync (() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'setRoot');

    // Orders are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    comp.orderServed(comp.orders[2]);

    tick();

    expect(navCtrl.setRoot).toHaveBeenCalled();

  }));
 
});