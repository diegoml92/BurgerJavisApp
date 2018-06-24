import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, 
  LoadingController, ToastController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { NewCategoryComponent } from './new-category.component';
import { Category } from '../../app/category';
import { CategoryService } from '../../providers/category.service';
import { NavMock, CategoryMock, 
  LoadingControllerMock, ToastControllerMock } from '../../test/mocks';
 
let comp: NewCategoryComponent;
let fixture: ComponentFixture<NewCategoryComponent>;
let de: DebugElement;
 
describe('Component: NewCategory Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent, NewCategoryComponent],
 
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

      fixture = TestBed.createComponent(NewCategoryComponent);
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

  it('should display NewCategory view correctyl', () => {

    fixture.detectChanges();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));
    let title = de.nativeElement;

    expect(title.textContent).toContain('Nueva categoría');

    // 'back' button
    de = fixture.debugElement.query(By.css('.back-button'));
    let backButton = de.nativeElement;

    expect(backButton).not.toBeNull();

    // form
    de = fixture.debugElement.query(By.css('ion-label'));
    let inputLabel = de.nativeElement;

    expect(inputLabel).not.toBeNull();
    expect(inputLabel.textContent).toContain('Nombre de la categoría');

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton).not.toBeNull();
    expect(addButton.disabled).toBeTruthy();
    expect(addButton.textContent).toContain('Añadir categoría');

  });

  it('should enable submit button when input has a valid value', fakeAsync(() => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form div button'));
    let addButton = de.nativeElement;

    expect(addButton.disabled).toBeTruthy();

    comp.newCategoryForm.controls['name'].setValue('New category');

    tick();
    fixture.detectChanges();

    expect(addButton.disabled).toBeFalsy();

  }));

  it('should call "addCategory" when form is submitted', fakeAsync(() => {

    fixture.detectChanges();

    let categoryService = fixture.debugElement.injector.get(CategoryService);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'onSubmit').and.callThrough();
    spyOn(categoryService, 'addCategory').and.callThrough();
    spyOn(navCtrl, 'pop');

    comp.newCategoryForm.controls['name'].setValue('New category');

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(categoryService.addCategory)
      .toHaveBeenCalledWith(new Category(comp.categoryName, false));
    expect(navCtrl.pop).toHaveBeenCalled();

  }));

  it('should show an error when "addCategory" fails', fakeAsync(() => {

    let categoryService = fixture.debugElement.injector.get(CategoryService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(categoryService, 'addCategory').and.returnValue(Promise.reject(null));
    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(comp, 'onSubmit').and.callThrough();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);

    tick();

    expect(comp.onSubmit).toHaveBeenCalled();
    expect(categoryService.addCategory).toHaveBeenCalled();
    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al crear la categoría'));

  }));
 
});