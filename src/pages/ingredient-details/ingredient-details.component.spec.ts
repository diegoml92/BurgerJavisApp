import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { IngredientDetailsComponent } from './ingredient-details.component';
import { IngredientService } from '../../providers/ingredient.service';

import { IngredientMock, NavMock,
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

  it('should display IngredientDetails view correctly', () => {

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

  });

  it('should call "updateName" when ingredient name is clicked', () => {

    spyOn(comp, 'updateName');

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
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'updateIngredient').and.callThrough();
    spyOn(ingredientService, 'updateIngredient').and
      .returnValue(Promise.resolve(comp.ingredient));
    spyOn(navCtrl, 'popToRoot');

    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    expect(comp.updateIngredient).toHaveBeenCalled();
    expect(ingredientService.updateIngredient).toHaveBeenCalledWith(comp.ingredient);

    tick();

    expect(navCtrl.popToRoot).not.toHaveBeenCalled();

  }));

  it('should call "deleteIngredient" when "delete" button is clicked', () => {

    spyOn(comp, 'deleteIngredient');

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

});