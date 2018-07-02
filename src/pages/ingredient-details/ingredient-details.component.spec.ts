import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams,
  ToastController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { IngredientDetailsComponent } from './ingredient-details.component';
import { IngredientService } from '../../providers/ingredient.service';

import { IngredientMock, NavMock, ToastControllerMock,
  NavParamsMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: IngredientDetailsComponent;
let fixture: ComponentFixture<IngredientDetailsComponent>;
let de: DebugElement;
 
describe('Component: IngredientDetails Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, IngredientDetailsComponent],
 
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
          provide: IngredientService,
          useClass: IngredientMock
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

      NavParamsMock.setParams(IngredientMock.mockIngredientList[0]);

      fixture = TestBed.createComponent(IngredientDetailsComponent);
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

  it('should display IngredientDetails view correctly', fakeAsync(() => {

    comp.ionViewWillEnter();

    tick();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain(IngredientMock.mockIngredientList[0].name);

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();

    de = fixture.debugElement.query(By.css('ion-content div em'));
    let el = de.nativeElement;

    expect(el.textContent).toContain('No hay más datos');

  }));

  it('should call popToRoot when error is received while loading the page', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);
    let ingredientService = fixture.debugElement.injector.get(IngredientService);

    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(navCtrl, 'popToRoot').and.callThrough();
    spyOn(ingredientService, 'getIngredient').and.returnValue(Promise.reject(null));

    comp.ionViewWillEnter();

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al obtener el ingrediente'));
    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should call "updateName" when ingredient name is clicked', () => {

    spyOn(comp, 'updateName').and.callThrough();

    de = fixture.debugElement.query(By.css('ion-title'));
    
    expect(de).not.toBeNull();
    de.triggerEventHandler('click', null);

    expect(comp.updateName).toHaveBeenCalled();

  });

  it('should show "save" button when changes are made to the ingredient', () => {

    fixture.detectChanges();

    expect(comp.modified).toBeFalsy();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).toBeNull();

    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));

    expect(de).not.toBeNull();
    expect(de.nativeElement.textContent).toContain('Guardar cambios');

  });

  it('should call "updateIngredient" when "save" button is clicked', fakeAsync(() => {

    let ingredientService = fixture.debugElement.injector.get(IngredientService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(comp, 'updateIngredient').and.callThrough();
    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(ingredientService, 'updateIngredient').and.returnValues
      (
        Promise.reject(null),
        Promise.resolve(comp.ingredient)
      );

    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    tick();

    expect(comp.updateIngredient).toHaveBeenCalled();
    expect(ingredientService.updateIngredient).toHaveBeenCalledWith(comp.ingredient);

    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al actualizar el ingrediente'));

  }));

  it('should call "deleteIngredient" when "delete" button is clicked', () => {

    spyOn(comp, 'deleteIngredient').and.callThrough();

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();
    de.triggerEventHandler('click', null);
    expect(comp.deleteIngredient).toHaveBeenCalled();

  });

  it('should call "pop" when removing an ingredient', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'pop');

    comp.removeIngredient();

    tick();

    expect(navCtrl.pop).toHaveBeenCalled();

  }));

  it('should display an error when removing an Ingredient fails', fakeAsync(() => {

    let ingredientService = fixture.debugElement.injector.get(IngredientService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(ingredientService, 'removeIngredient').and.returnValue(Promise.reject(null));
    spyOn(toastCtrl, 'create').and.callThrough();

    comp.removeIngredient();

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al borrar el ingrediente'));

  }));

});