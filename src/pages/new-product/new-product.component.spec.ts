import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, LoadingController} from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { NewProductComponent } from './new-product.component';
import { Product } from '../../app/product';
import { ProductService } from '../../providers/product.service';
import { NavMock, ProductMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: NewProductComponent;
let fixture: ComponentFixture<NewProductComponent>;
let de: DebugElement;
 
describe('Component: NewProduct Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, NewProductComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: ProductService,
          useClass: ProductMock
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

      fixture = TestBed.createComponent(NewProductComponent);
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

  it('should display NewProduct view correctyl', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Nuevo producto');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // form
    let labels = fixture.debugElement.queryAll(By.css('ion-label'));

    expect(labels.length).toEqual(2);

    let inputLabel = labels[0].nativeElement;

    expect(inputLabel).not.toBeNull();
    expect(inputLabel.textContent).toContain('Nombre del producto');

    inputLabel = labels[1].nativeElement;

    expect(inputLabel).not.toBeNull();
    expect(inputLabel.textContent).toContain('Precio del producto');

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();
    expect(addButton.disabled).toBeTruthy();
    expect(addButton.textContent).toContain('Añadir producto');

  });

  it('should enable submit button when all inputs have a valid value', fakeAsync(() => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton.disabled).toBeTruthy();

    comp.newProductForm.controls['name'].setValue('New Product');

    tick();
    fixture.detectChanges();

    expect(addButton.disabled).toBeTruthy();

    comp.newProductForm.controls['price'].setValue(5.00);

    tick();
    fixture.detectChanges();

    expect(addButton.disabled).toBeFalsy();

  }));

  it('should call "addProduct" when form is submitted', fakeAsync(() => {

    fixture.detectChanges();

    let productService = fixture.debugElement.injector.get(ProductService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'onSubmit').and.callThrough();
    spyOn(productService, 'addProduct').and.callThrough();
    spyOn(navCtrl, 'popToRoot');

    comp.newProductForm.controls['name'].setValue('New Product');
    comp.newProductForm.controls['price'].setValue(5.00);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(productService.addProduct)
      .toHaveBeenCalledWith(new Product(comp.productName, comp.productPrice));
    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  xit('should launch previous view when the back button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'pop');

    de = fixture.debugElement.query(By.css('.back-button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.pop).toHaveBeenCalled();

  });
 
});