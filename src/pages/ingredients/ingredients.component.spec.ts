import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { IngredientsComponent } from './ingredients.component';
import { IngredientDetailsComponent } from '../ingredient-details/ingredient-details.component';
import { NewIngredientComponent } from '../new-ingredient/new-ingredient.component';
import { IngredientService } from '../../providers/ingredient.service';
import { NavMock, LoadingControllerMock, IngredientMock } from '../../test/mocks';
 
let comp: IngredientsComponent;
let fixture: ComponentFixture<IngredientsComponent>;
let de: DebugElement;
 
describe('Component: Ingredients Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, IngredientsComponent],
 
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
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(IngredientsComponent);
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

  it('should display Ingredients view correctyl', fakeAsync(() => {

    let ingredientService = fixture.debugElement.injector.get(IngredientService);

    // Ingredients are loaded in ionViewWillLoad method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Ingredientes');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'add' button
    de = fixture.debugElement.query(By.css('ion-fab'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();

    // list of Ingredients
    expect(ingredientService.ingredientList.length).toEqual(3);
    expect(ingredientService.ingredientList.length).toEqual(comp.ingredients.length);

    de = fixture.nativeElement.querySelectorAll('[ion-item]');
    ingredientService.ingredientList.forEach((ingredient, i) => {

      let listItem = de[i];

      expect(listItem.textContent).toContain(ingredient.name);

    });

  }));

  it('should display a message when ingredient list is empty', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-content div em'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Aún no hay ningún ingredient')

  });

  it('should launch "IngredientDetails" view when a list element is clicked', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    // Ingredients are loaded in ionViewWillLoad method
    comp.ionViewWillEnter();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('[ion-item]'))[1];
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalled();
    expect(navCtrl.push).toHaveBeenCalledWith(IngredientDetailsComponent, 
      { ingredient: comp.ingredients[1]});

  }));

  it('should launch "NewIngredient" view when the add button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    de = fixture.debugElement.query(By.css('ion-fab button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalled();
    expect(navCtrl.push).toHaveBeenCalledWith(NewIngredientComponent);

  });

  xit('should launch previous view when the back button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'pop');

    de = fixture.debugElement.query(By.css('.back-button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.pop).toHaveBeenCalled();

  });
 
});