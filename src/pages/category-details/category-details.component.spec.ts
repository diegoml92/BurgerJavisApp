import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryService } from '../../providers/category.service';
import { NavMock, NavParamsMock, CategoryMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: CategoryDetailsComponent;
let fixture: ComponentFixture<CategoryDetailsComponent>;
let de: DebugElement;
 
describe('Component: CategoryDetails Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, CategoryDetailsComponent],
 
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
          provide: CategoryService,
          useClass: CategoryMock
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

      NavParamsMock.setParams(CategoryMock.mockCategoryList[0]);

      fixture = TestBed.createComponent(CategoryDetailsComponent);
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

  it('should display CategoryDetails view correctly', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain(CategoryMock.mockCategoryList[0].name);

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

  it('should call "updateName" when category name is clicked', () => {

    spyOn(comp, 'updateName');

    de = fixture.debugElement.query(By.css('ion-title'));
    
    expect(de).not.toBeNull();
    de.triggerEventHandler('click', null);

    expect(comp.updateName).toHaveBeenCalled();

  });

  it('should show "save" button when changes are made to the category', () => {

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

  it('should call "updateCategory" when "save" button is clicked', fakeAsync(() => {

    let categoryService = fixture.debugElement.injector.get(CategoryService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'updateCategory').and.callThrough();
    spyOn(categoryService, 'updateCategory').and.returnValue(Promise.resolve(comp.category));
    spyOn(navCtrl, 'popToRoot');

    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    expect(comp.updateCategory).toHaveBeenCalled();
    expect(categoryService.updateCategory).toHaveBeenCalledWith(comp.category);

    tick();

    expect(navCtrl.popToRoot).not.toHaveBeenCalled();

  }));

  it('should call "deleteCategory" when "delete" button is clicked', () => {

    spyOn(comp, 'deleteCategory');

    // 'delete' button
    de = fixture.debugElement.query(By.css('ion-navbar ion-buttons button'));
    let deleteButton = de.nativeElement;

    expect(deleteButton).not.toBeNull();
    de.triggerEventHandler('click', null);
    expect(comp.deleteCategory).toHaveBeenCalled();

  });

  it('should call "pop" when removing a category', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'pop');

    comp.removeCategory();

    tick();

    expect(navCtrl.pop).toHaveBeenCalled();

  }));

});