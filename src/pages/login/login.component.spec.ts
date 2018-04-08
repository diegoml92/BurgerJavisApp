import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicModule, NavController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { AuthenticationManager } from '../../app/authentication-manager';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../app/login.service';
import { SplashScreenMock, StatusBarMock, NavMock, 
  LoginMock, AuthMock } from '../../test/mocks';
 
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
          provide: LoginService,
          useClass: LoginMock
        },
        {
          provide: AuthenticationManager,
          userClass: AuthMock
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

    fixture.detectChanges();

    spyOn(comp, 'login');

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

  });

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