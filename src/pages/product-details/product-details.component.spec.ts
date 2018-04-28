import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../../providers/product.service';
import { IngredientService } from '../../providers/ingredient.service';
import { NavMock, NavParamsMock, IngredientMock,
  ProductMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: ProductDetailsComponent;
let fixture: ComponentFixture<ProductDetailsComponent>;
let de: DebugElement;
 
describe('Component: ProductDetails Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, ProductDetailsComponent],
 
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
          provide: ProductService,
          useClass: ProductMock
        },
        {
          provide: IngredientService,
          useClass: IngredientMock
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

      NavParamsMock.setParams(ProductMock.mockProductList[0]);

      fixture = TestBed.createComponent(ProductDetailsComponent);
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

  it('should display ProductDetails view correctly', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain(ProductMock.mockProductList[0].name);

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();

    // ingredient list
    de = fixture.nativeElement.querySelectorAll('ion-item');
    comp.product.ingredients.forEach((ingredient, i) => {

      let item = de[i];
      expect(item.textContent).toContain(ingredient.name);
      expect(item.innerHTML).toContain('remove-circle');

    });

    de = fixture.debugElement.query(By.css('ion-fab'));

    expect(de).not.toBeNull();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).toBeNull();

  });

  it('should show "save" button when changes are made to the product', () => {

    fixture.detectChanges();

    expect(comp.modified).toBeFalsy();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).toBeNull();

    let aux = fixture.debugElement.query(By.css('ion-item button'));

    aux.triggerEventHandler('click', null);

    expect(comp.modified).toBeTruthy();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).not.toBeNull();
    expect(de.nativeElement.textContent).toContain('Guardar cambios');

  });

  it('should call "deleteProduct" when "delete" button is clicked', () => {

    spyOn(comp, 'deleteProduct');

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();
    de.triggerEventHandler('click', null);
    expect(comp.deleteProduct).toHaveBeenCalled();

  });

  it('should call "pop" when removing a Product', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'popToRoot');

    comp.removeProduct();

    tick();

    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should remove ingredient when "remove" button is clicked', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-item button'));
    let currentItems = comp.product.ingredients.length;

    de.triggerEventHandler('click', null);

    expect(comp.product.ingredients.length).toEqual(currentItems - 1);

  });

  it('should call "updateproduct" when "save" button is clicked', fakeAsync(() => {

    let productService = fixture.debugElement.injector.get(ProductService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'updateProduct').and.callThrough();
    spyOn(productService, 'updateProduct').and.returnValue(Promise.resolve(comp.product));
    spyOn(navCtrl, 'popToRoot');

    fixture.detectChanges();

    let aux = fixture.debugElement.query(By.css('ion-item button'));
    aux.triggerEventHandler('click', null);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    expect(comp.updateProduct).toHaveBeenCalledWith();
    expect(productService.updateProduct).toHaveBeenCalledWith(comp.product);

    tick();

    expect(navCtrl.popToRoot).not.toHaveBeenCalled();

  }));

  it('should call "addIngredient" when add button is clicked', () => {

    spyOn(comp, 'addIngredient');

    de = fixture.debugElement.query(By.css('ion-fab button'));
    de.triggerEventHandler('click', null);

    expect(comp.addIngredient).toHaveBeenCalled();

  });

  it('should display a message when the ingredient list is empty', () => {

    comp.product.ingredients = [];

    fixture.detectChanges()
    de = fixture.debugElement.query(By.css('div em'));

    expect(de).not.toBeNull();
    let el = de.nativeElement;
    expect(el.textContent).toContain('No hay ingredientes');

  });

});