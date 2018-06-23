import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams,
  ToastController, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { Util } from '../../app/util';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryService } from '../../providers/category.service';
import { NavMock, NavParamsMock, CategoryMock,
  ToastControllerMock, LoadingControllerMock } from '../../test/mocks';
 
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

  it('should display CategoryDetails view correctly', fakeAsync(() => {

    comp.ionViewWillEnter();

    tick();

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

  }));

  it('should call popToRoot when error is received while loading the page', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);
    let categoryService = fixture.debugElement.injector.get(CategoryService);

    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(navCtrl, 'popToRoot').and.callThrough();
    spyOn(categoryService, 'getCategory').and.returnValue(Promise.reject(null));

    comp.ionViewWillEnter();

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al obtener la categoría'));
    expect(navCtrl.popToRoot).toHaveBeenCalled();

  }));

  it('should call "updateName" when category name is clicked', () => {

    spyOn(comp, 'updateName').and.callThrough();

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
    let toastCtrl = fixture.debugElement.injector.get(ToastController);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(comp, 'updateCategory').and.callThrough();
    spyOn(toastCtrl, 'create').and.callThrough();
    spyOn(categoryService, 'updateCategory').and.returnValues
      (
        Promise.reject(null),
        Promise.resolve(comp.category)
      );

    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    expect(comp.updateCategory).toHaveBeenCalled();
    expect(categoryService.updateCategory).toHaveBeenCalledWith(comp.category);

    tick();
    comp.modified = true;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.save-button'));
    de.triggerEventHandler('click', null);

    expect(comp.updateCategory).toHaveBeenCalled();
    expect(categoryService.updateCategory).toHaveBeenCalledWith(comp.category);

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al actualizar la categoría'));

  }));

  it('should call "deleteCategory" when "delete" button is clicked', () => {

    spyOn(comp, 'deleteCategory').and.callThrough();

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

  it('should display an error when removing a Category fails', fakeAsync(() => {

    let categoryService = fixture.debugElement.injector.get(CategoryService);
    let toastCtrl = fixture.debugElement.injector.get(ToastController);

    spyOn(categoryService, 'removeCategory').and.returnValue(Promise.reject(null));
    spyOn(toastCtrl, 'create').and.callThrough();

    comp.removeCategory();

    tick();

    expect(toastCtrl.create).toHaveBeenCalledWith
      (Util.getToastParams('Error al borrar la categoría'));

  }));

});