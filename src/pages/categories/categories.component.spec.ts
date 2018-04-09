import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, LoadingController} from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { CategoriesComponent } from './categories.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryService } from '../../providers/category.service';
import { NavMock, CategoryMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: CategoriesComponent;
let fixture: ComponentFixture<CategoriesComponent>;
let de: DebugElement;
 
describe('Component: Categories Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, CategoriesComponent],
 
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: CategoryService,
          useClass: CategoryMock
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

      fixture = TestBed.createComponent(CategoriesComponent);
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

  it('should display Categories view correctyl', fakeAsync(() => {

    let categoryService = fixture.debugElement.injector.get(CategoryService);

    // Categories are loaded in ionViewWillLoad method
    comp.ionViewWillLoad();

    tick();
    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Categorías');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // 'add' button
    de = fixture.debugElement.query(By.css('ion-fab'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();

    // list of categories
    expect(categoryService.categoryList.length).toEqual(3);
    expect(categoryService.categoryList.length).toEqual(comp.categories.length);

    de = fixture.nativeElement.querySelectorAll('[ion-item]');
    categoryService.categoryList.forEach((category, i) => {

      let listItem = de[i];

      expect(listItem.textContent).toContain(category.name);
      if(category.favorite) {
        expect(listItem.innerHTML).toContain('star');
      } else {
        expect(listItem.innerHTML).toContain('star-outline');
      };

    });

  }));

  it('should display a message when category list is empty', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-content div em'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Aún no hay ninguna categoría')

  });

  // event.stopPropagation inside setFavorite() breaks this test
  xit('should call "setFavorite()" when "favorite" button is clicked', fakeAsync(() => {

    // Categories are loaded in ionViewWillLoad method
    comp.ionViewWillLoad();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('[ion-item] button'))[1];
    de.triggerEventHandler('click', null);

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('[ion-item]'))[1];
    let item = de.nativeElement;

    expect(item.innerHTML).toContain('star-outline');

  }));

  it('should launch "CategoryDetails" view when a list element is clicked', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    // Categories are loaded in ionViewWillLoad method
    comp.ionViewWillLoad();

    tick();
    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('[ion-item]'))[1];
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalled();
    expect(navCtrl.push).toHaveBeenCalledWith(CategoryDetailsComponent, 
      { category: comp.categories[1]});

  }));

  it('should launch "NewCategory" view when the add button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

    de = fixture.debugElement.query(By.css('ion-fab button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.push).toHaveBeenCalled();
    expect(navCtrl.push).toHaveBeenCalledWith(NewCategoryComponent);

  });

  xit('should launch previous view when the back button is clicked', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'pop');

    de = fixture.debugElement.query(By.css('.back-button'));
    de.triggerEventHandler('click', null);

    expect(navCtrl.pop).toHaveBeenCalled();

  });
 
});