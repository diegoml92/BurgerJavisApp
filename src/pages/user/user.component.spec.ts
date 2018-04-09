import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { UserComponent } from './user.component';
import { LoginComponent } from '../login/login.component';
import { AuthenticationManager } from '../../providers/authentication-manager';
import { NavMock, AuthMock } from '../../test/mocks';
 
let comp: UserComponent;
let fixture: ComponentFixture<UserComponent>;
let de: DebugElement;
 
describe('Component: User Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, UserComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
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

      fixture = TestBed.createComponent(UserComponent);
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

  it('should display User view correctyl', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Información del usuario');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'logout' button
    de = fixture.debugElement.query(By.css('ion-content [ion-button]'));
    let logoutButton = de.nativeElement;

    expect(logoutButton).not.toBeNull();
    expect(logoutButton.textContent).toContain('Cerrar sesión');

    // image
    de = fixture.debugElement.query(By.css('img'));
    let img = de.nativeElement;

    expect(img.src).toContain('assets/img/burgerjavis.png');

    // user and role
    let userData = fixture.debugElement.queryAll(By.css('h2'));
    let el = userData[0].nativeElement;

    expect(el.textContent).toContain('Usuario: ' + comp.getUsername());

    el = userData[1].nativeElement;

    expect(el.textContent).toContain('Rol: ' + comp.getRole());

  });

  it('should log out when "logout" button is clicked', () => {

    let authManager = fixture.debugElement.injector.get(AuthenticationManager);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'logOut').and.callThrough();
    spyOn(authManager, 'resetCredentials').and.callThrough();
    spyOn(navCtrl, 'push');

    de = fixture.debugElement.query(By.css('ion-content [ion-button]'));
    de.triggerEventHandler('click', null);

    expect(comp.logOut).toHaveBeenCalled();
    expect(authManager.resetCredentials).toHaveBeenCalled();
    expect(navCtrl.push).toHaveBeenCalledWith(LoginComponent);

  });

  xit('should launch previous view when the back button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'pop');

    de = fixture.debugElement.query(By.css('.back-button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.pop).toHaveBeenCalled();

  });
 
});