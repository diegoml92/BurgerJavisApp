import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, 
  LoadingController, ToastController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { NewIngredientComponent } from './new-ingredient.component';
import { Ingredient } from '../../app/ingredient';
import { IngredientService } from '../../providers/ingredient.service';
import { NavMock, IngredientMock, 
  LoadingControllerMock, ToastControllerMock } from '../../test/mocks';
 
let comp: NewIngredientComponent;
let fixture: ComponentFixture<NewIngredientComponent>;
let de: DebugElement;
 
describe('Component: NewIngredient Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, NewIngredientComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: IngredientService,
          useClass: IngredientMock
        },
        {
          provide : LoadingController,
          useClass : LoadingControllerMock
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

      fixture = TestBed.createComponent(NewIngredientComponent);
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

  it('should display NewIngredient view correctyl', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Nuevo ingrediente');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // form
    de = fixture.debugElement.query(By.css('ion-label'));
    let inputLabel = de.nativeElement;

    expect(inputLabel).not.toBeNull();
    expect(inputLabel.textContent).toContain('Nombre del ingrediente');

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();
    expect(addButton.disabled).toBeTruthy();
    expect(addButton.textContent).toContain('Añadir ingrediente');

  });

  it('should enable submit button when input has a valid value', fakeAsync(() => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton.disabled).toBeTruthy();

    comp.newIngredientForm.controls['name'].setValue('New Ingredient');

    tick();
    fixture.detectChanges();

    expect(addButton.disabled).toBeFalsy();

  }));

  it('should call "addIngredient" when form is submitted', fakeAsync(() => {

    fixture.detectChanges();

    let ingredientService = fixture.debugElement.injector.get(IngredientService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'onSubmit').and.callThrough();
    spyOn(ingredientService, 'addIngredient').and.callThrough();
    spyOn(navCtrl, 'pop');

    comp.newIngredientForm.controls['name'].setValue('New Ingredient');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(ingredientService.addIngredient)
      .toHaveBeenCalledWith(new Ingredient(comp.ingredientName));
    expect(navCtrl.pop).toHaveBeenCalled();

  }));

  it('should show an error when "addIngredient" fails', fakeAsync(() => {

    let ingredientService = fixture.debugElement.injector.get(IngredientService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(ingredientService, 'addIngredient').and.returnValue(Promise.reject(null));
    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(comp, 'onSubmit').and.callThrough();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(ingredientService.addIngredient).toHaveBeenCalled();
    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al crear el ingrediente'));

  }));
 
});