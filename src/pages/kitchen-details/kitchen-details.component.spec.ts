import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { KitchenDetailsComponent } from '../kitchen-details/kitchen-details.component';
import { OrderService } from '../../providers/order.service';
import { NavMock, NavParamsMock, KitchenMock, LoadingControllerMock } from '../../test/mocks';
 
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

  it('should display KitchenDetails view correctly', () => {

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

  });

  it('should call "serveOrder" when serve button is clicked', () => {

    spyOn(comp, 'serveOrder');

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

});