import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicModule, NavController, 
  LoadingController, ToastController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { SummaryComponent } from '../summary/summary.component';
import { OrdersComponent } from '../orders/orders.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { ROLE_ADMIN, ROLE_WAITER, ROLE_KITCHEN } from '../../app/commons';
import { Credentials } from '../../app/credentials';
import { AuthenticationManager } from '../../providers/authentication-manager';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../providers/login.service';
import { SplashScreenMock, StatusBarMock, NavMock, LoadingControllerMock,
  ToastControllerMock, LoginMock, AuthMock } from '../../test/mocks';
 
let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de: DebugElement;
 
describe('Component: Login Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, LoginComponent],
 
      providers: [
        {
          provide: StatusBar,
          useClass: StatusBarMock
        },
        {
          provide: SplashScreen,
          useClass: SplashScreenMock
        },
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: ToastController,
          useClass: ToastControllerMock
        },
        {
          provide: LoadingController,
          useClass: LoadingControllerMock
        },
        {
          provide: LoginService,
          useClass: LoginMock
        },
        {
          provide: AuthenticationManager,
          useClass: AuthMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(LoginComponent);
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

  it('should display the login form', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('[name=username]'));
    let username = de.nativeElement;

    expect(username).not.toBeNull();

    de = fixture.debugElement.query(By.css('[name=password]'));
    let password = de.nativeElement;

    expect(password).not.toBeNull();

    de = fixture.debugElement.query(By.css('button'));
    let button = de.nativeElement;

    expect(button).not.toBeNull();
    expect(button.disabled).toBeTruthy();

  });

  it('should login when login button is clicked', () => {

    let loginService = fixture.debugElement.injector.get(LoginService);

    fixture.detectChanges();

    spyOn(comp, 'login').and.callThrough();
    spyOn(loginService, 'login');

    de = fixture.debugElement.query(By.css('button'));
    let button = <HTMLButtonElement>de.nativeElement;
    expect(button.disabled).toBeTruthy();

    comp.loginForm.controls['username'].setValue('admin');
    comp.loginForm.controls['password'].setValue('admin');

    fixture.detectChanges();

    expect(comp.loginForm.value).toEqual({username: 'admin', password: 'admin'});
    expect(comp.loginForm.valid).toBeTruthy();

    expect(button.disabled).toBeFalsy();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(comp.login).toHaveBeenCalled();

    expect(loginService.login)
      .toHaveBeenCalledWith(new Credentials("admin","admin"));

  });

  it('should navigate to corresponding page depending on the user role', fakeAsync(() => {

    let loginService = fixture.debugElement.injector.get(LoginService);
    let navCtrl = fixture.debugElement.injector.get(NavController);
    let auth = fixture.debugElement.injector.get(AuthenticationManager);

    const USERNAME = "admin";
    const PASSWORD = "admin";

    const USER1 = new Credentials(USERNAME, PASSWORD, [ ROLE_ADMIN ]);
    const USER2 = new Credentials(USERNAME, PASSWORD, [ ROLE_WAITER ]);
    const USER3 = new Credentials(USERNAME, PASSWORD, [ ROLE_KITCHEN ]);

    spyOn(navCtrl, 'setRoot');
    spyOn(auth, 'setCredentials').and.callThrough();
    spyOn(loginService, 'login').and.returnValues
      (
        Promise.resolve(USER1),
        Promise.resolve(USER2),
        Promise.resolve(USER3)
      );

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('button'));
    let button = <HTMLButtonElement>de.nativeElement;
    expect(button.disabled).toBeTruthy();

    comp.loginForm.controls['username'].setValue(USERNAME);
    comp.loginForm.controls['password'].setValue(PASSWORD);

    fixture.detectChanges();

    expect(comp.loginForm.value).toEqual({username: USERNAME, password: PASSWORD});
    expect(comp.loginForm.valid).toBeTruthy();

    expect(button.disabled).toBeFalsy();

    // In the first call the returned role is ADMIN
    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(auth.setCredentials).toHaveBeenCalledWith(USER1);
    expect(navCtrl.setRoot).toHaveBeenCalledWith(SummaryComponent);

    // In the second call the returned role is WAITER
    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(auth.setCredentials).toHaveBeenCalledWith(USER2);
    expect(navCtrl.setRoot).toHaveBeenCalledWith(OrdersComponent);

    // In the third call the returned role is KITCHEN
    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(auth.setCredentials).toHaveBeenCalledWith(USER3);
    expect(navCtrl.setRoot).toHaveBeenCalledWith(KitchenComponent);

  }));

  it('should call resetCredentials when login request is unsuccessful', fakeAsync(() => {

    let loginService = fixture.debugElement.injector.get(LoginService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);
    let auth = fixture.debugElement.injector.get(AuthenticationManager);

    //spyOn(loginService, 'login').and.returnValues
      //(Promise.resolve(null), Promise.reject(null));
    spyOn(loginService, 'login').and.returnValues
      (Promise.reject(null), Promise.resolve(null));
    spyOn(auth, 'resetCredentials').and.callThrough();
    spyOn(toastCtrl, 'create').and.callThrough();

    // In the first call, login request is rejected
    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(auth.resetCredentials).toHaveBeenCalled();
    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('No se pudo iniciar sesión'));

    // In the second call, null credentials are returned
    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(auth.resetCredentials).toHaveBeenCalled();
    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Los datos introducidos no son válidos'));

  }));

  it('should not login while login button is disabled', () => {

    fixture.detectChanges();

    spyOn(comp, 'login');

    de = fixture.debugElement.query(By.css('button'));
    let button = de.nativeElement;

    expect(button.disabled).toBeTruthy();

    comp.loginForm.controls['username'].setValue('admin');

    expect(button.disabled).toBeTruthy();

    comp.loginForm.controls['password'].setValue('admin');

    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();

    de = fixture.debugElement.query(By.css('form'));

    de.triggerEventHandler('ngSubmit', null);
    expect(comp.login).toHaveBeenCalled();

  });
 
});