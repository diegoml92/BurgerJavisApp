import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, 
  LoadingController, ToastController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { NewOrderComponent } from './new-order.component';
import { OrderService } from '../../providers/order.service';
import { AuthenticationManager } from '../../providers/authentication-manager';
import { NavMock, OrderMock, LoadingControllerMock, 
  AuthMock, ToastControllerMock } from '../../test/mocks';
 
let comp: NewOrderComponent;
let fixture: ComponentFixture<NewOrderComponent>;
let de: DebugElement;
 
describe('Component: NewOrder Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, NewOrderComponent],
 
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
        },
        {
          provide: AuthenticationManager,
          useClass: AuthMock
        },
        {
          provide : ToastController,
          useClass : ToastControllerMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(NewOrderComponent);
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

  it('should display NewOrder view correctyl', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Nuevo pedido');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // form
    de = fixture.debugElement.query(By.css('ion-label'));
    let inputLabel = de.nativeElement;

    expect(inputLabel).not.toBeNull();
    expect(inputLabel.textContent).toContain('Nombre del pedido');

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();
    expect(addButton.disabled).toBeTruthy();
    expect(addButton.textContent).toContain('Añadir pedido');

  });

  it('should enable submit button when input has a valid value', fakeAsync(() => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton.disabled).toBeTruthy();

    comp.newOrderForm.controls['name'].setValue('New Order');

    tick();
    fixture.detectChanges();

    expect(addButton.disabled).toBeFalsy();

  }));

  it('should call "addOrder" when form is submitted', fakeAsync(() => {

    fixture.detectChanges();

    let orderService = fixture.debugElement.injector.get(OrderService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'onSubmit').and.callThrough();
    spyOn(orderService, 'addOrder').and.callThrough();
    spyOn(navCtrl, 'popToRoot');

    comp.newOrderForm.controls['name'].setValue('New Order');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(orderService.addOrder).toHaveBeenCalled();
    
    // Not working => Enum tpye?
    /*expect(orderService.addOrder)
      .toHaveBeenCalledWith(
        new Order(comp.orderName, authManager.getCredentials().username)
      );*/
    
    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should show an error when "addOrder" fails', fakeAsync(() => {

    let orderService = fixture.debugElement.injector.get(OrderService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(orderService, 'addOrder').and.returnValue(Promise.reject(null));
    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(comp, 'onSubmit').and.callThrough();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(orderService.addOrder).toHaveBeenCalled();
    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al crear el pedido'));

  }));
 
});