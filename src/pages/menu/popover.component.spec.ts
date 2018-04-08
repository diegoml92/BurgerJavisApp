import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, ViewController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { PopoverPage } from '../menu/menu.component';

import { ViewMock } from '../../test/mocks';
 
let comp: PopoverPage;
let fixture: ComponentFixture<PopoverPage>;
let de: DebugElement;
 
describe('Component: Menu Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, PopoverPage],
 
      providers: [
        { 
          provide: ViewController,
          useClass: ViewMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(PopoverPage);
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

  it('should display Popover view correctly', () => {

    de = fixture.nativeElement.querySelectorAll('[ion-item]');

    // 'categories' button
    expect(de[0].textContent).not.toBeNull();
    // 'ingredients' button
    expect(de[1].textContent).not.toBeNull();

  });

  it('should call "goToCategories" when categories button is clicked', () => {

    spyOn(comp, 'goToCategories');

    de = fixture.debugElement.queryAll(By.css('[ion-item]'))[0];
    de.triggerEventHandler('click', null);

    expect(comp.goToCategories).toHaveBeenCalled();

  });

  it('should call "goToIngredients" when ingredients button is clicked', () => {

    spyOn(comp, 'goToIngredients');

    de = fixture.debugElement.queryAll(By.css('[ion-item]'))[1];
    de.triggerEventHandler('click', null);

    expect(comp.goToIngredients).toHaveBeenCalled();

  });

});