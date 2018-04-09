import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { MenuComponent } from '../menu/menu.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AuthenticationManager } from '../../providers/authentication-manager';
import { ProductService } from '../../providers/product.service';
import { NavMock, AuthMock, ProductMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: MenuComponent;
let fixture: ComponentFixture<MenuComponent>;
let de: DebugElement;
 
describe('Component: Menu Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, MenuComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: AuthenticationManager,
          useClass: AuthMock
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

      fixture = TestBed.createComponent(MenuComponent);
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

  it('should display Menu view for default users', fakeAsync(() => {

    // Products are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;
    expect(title.textContent).toContain('Menú');

    // 'menu' button
    de = fixture.debugElement.query(By.css('ion-navbar [menutoggle]'));
    expect(de).not.toBeNull();

    // 'option' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    expect(de).toBeNull();

    // 'add' button
    de = fixture.debugElement.query(By.css('ion-fab'));
    expect(de).toBeNull();

    // list of products
    expect(comp.menu.length).toEqual(3);

    de = fixture.nativeElement.querySelectorAll('ion-list button');
    comp.menu.forEach((product, i) => {

      let menuItem = de[i];

      expect(menuItem.disabled).toBeTruthy();

      expect(menuItem.textContent).toContain(product.name);
      expect(menuItem.textContent).toContain('€' + product.price);
      
      comp.menu[i].ingredients.forEach((ingredient, j) => {

        expect(menuItem.innerHTML).toContain('- ' + ingredient.name);

      });

    });

  }));

  it('should display Menu view for admin users', fakeAsync(() => {

    let authManager = fixture.debugElement.injector.get(AuthenticationManager);
    authManager.setCredentials(AuthMock.adminUser);

    // Products are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;
    expect(title.textContent).toContain('Menú');

    // 'menu' button
    de = fixture.debugElement.query(By.css('ion-navbar [menutoggle]'));
    expect(de).not.toBeNull();

    // 'option' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    expect(de).not.toBeNull();

    // 'add' button
    de = fixture.debugElement.query(By.css('ion-fab'));
    expect(de).not.toBeNull();

    // list of products
    expect(comp.menu.length).toEqual(3);

    de = fixture.nativeElement.querySelectorAll('ion-list button');
    comp.menu.forEach((product, i) => {

      let menuItem = de[i];

      expect(menuItem.disabled).toBeFalsy();

      expect(menuItem.textContent).toContain(product.name);
      expect(menuItem.textContent).toContain('€' + product.price);
      
      comp.menu[i].ingredients.forEach((ingredient, j) => {

        expect(menuItem.innerHTML).toContain('- ' + ingredient.name);

      });

    });

  }));

  it('should launch "ProductDetails" view when a list element is clicked', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'productTapped').and.callThrough();
    spyOn(navCtrl, 'push');

    // Products are loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('ion-list button'))[1];
    de.triggerEventHandler('click', null);

    expect(comp.productTapped).toHaveBeenCalledWith(comp.menu[1]);
    expect(navCtrl.push).toHaveBeenCalledWith(ProductDetailsComponent,
      { product: comp.menu[1] })

  }));

  it('should launch "PopoverPage" when option button is clicked', () => {

    let authManager = fixture.debugElement.injector.get(AuthenticationManager);
    authManager.setCredentials(AuthMock.adminUser);

    spyOn(comp, 'presentPopover');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    de.triggerEventHandler('click', null);

    expect(comp.presentPopover).toHaveBeenCalled();

  });

});