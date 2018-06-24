import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams,
  ToastController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { KitchenDetailsComponent } from '../kitchen-details/kitchen-details.component';
import { OrderService } from '../../providers/order.service';
import { NavMock, NavParamsMock, KitchenMock,
  ToastControllerMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: KitchenDetailsComponent;
let fixture: ComponentFixture<KitchenDetailsComponent>;
let de: DebugElement;
 
describe('Component: KitchenDetails Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, KitchenDetailsComponent],
 
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
          useClass: KitchenMock
        },
        {
          provide: LoadingController,
          useClass: LoadingControllerMock
        },
        {
          provide: ToastController,
          useClass: ToastControllerMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      NavParamsMock.setParams(KitchenMock.mockOrderList[2]);

      fixture = TestBed.createComponent(KitchenDetailsComponent);
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

  it('should display KitchenDetails view correctly', fakeAsync(() => {

    comp.ionViewWillEnter();

    tick();

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain(KitchenMock.mockOrderList[2].name);

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // order items
    de = fixture.nativeElement.querySelectorAll('h2');

    comp.order.items.forEach((item, i) => {

      let orderItem = de[i];

      expect(orderItem.textContent).toContain(comp.order.items[i].product.name);
      expect(orderItem.textContent).toContain('x' + comp.order.items[i].amount);

    });

    // 'serve' button
    de = fixture.debugElement.query(By.css('ion-content div button'));
    let serveButton = de.nativeElement;

    expect(serveButton.textContent).toContain('Servir');

  }));

  it('should call popToRoot when error is received while loading the page', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);
    let kitchenService = fixture.debugElement.injector.get(OrderService);

    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(navCtrl, 'popToRoot').and.callThrough();
    spyOn(kitchenService, 'getOrder').and.returnValue(Promise.reject(null));

    comp.ionViewWillEnter();

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al obtener la comanda'));
    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should call "serveOrder" when serve button is clicked', () => {

    spyOn(comp, 'serveOrder').and.callThrough();

    fixture.detectChanges();

    // 'serve' button
    de = fixture.debugElement.query(By.css('ion-content div button'));
    de.triggerEventHandler('click', null);

    expect(comp.serveOrder).toHaveBeenCalledWith(comp.order);

  });

  it('should call "updateOrder" and "popToRoot" when order is served', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    let kitchenService = fixture.debugElement.injector.get(OrderService);

    spyOn(navCtrl, 'popToRoot');
    spyOn(kitchenService, 'updateOrder').and.returnValue(Promise.resolve(comp.order));

    fixture.detectChanges();

    comp.orderServed(comp.order);

    tick();

    expect(kitchenService.updateOrder).toHaveBeenCalledWith(comp.order, true);
    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should show an error when updateOrder fails', fakeAsync(() => {

    let kitchenService = fixture.debugElement.injector.get(OrderService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(kitchenService, 'updateOrder').and.returnValue(Promise.reject(null));
    spyOn(toastCtrl, 'create').and.callThrough();

    comp.orderServed(null);

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al actualizar el pedido'));

  }));

});