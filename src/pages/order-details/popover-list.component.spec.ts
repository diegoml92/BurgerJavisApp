import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, ViewController, NavParams } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { PopoverListComponent } from '../order-details/popover-list.component';

import { ViewMock, NavParamsMock, ProductMock } from '../../test/mocks';
 
let comp: PopoverListComponent;
let fixture: ComponentFixture<PopoverListComponent>;
let de: DebugElement;
 
describe('Component: PopoverList Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, PopoverListComponent],
 
      providers: [
        { 
          provide: ViewController,
          useClass: ViewMock
        },
        {
          provide: NavParams,
          useClass: NavParamsMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      NavParamsMock.setParams(ProductMock.mockProductList);

      fixture = TestBed.createComponent(PopoverListComponent);
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

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-title'));
    expect(de.nativeElement.textContent).toContain('Seleccionar producto');

    de = fixture.nativeElement.querySelectorAll('ion-list button');

    comp.localList.forEach((product, i) => {

      let listItem = de[i];
      expect(listItem.textContent).toContain(product.name);

    });

  });

  it('should add the clicked product to the current order', () => {

    spyOn(comp, 'addProduct').and.callThrough();

    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('ion-list button'))[1];
    de.triggerEventHandler('click', null);

    expect(comp.addProduct).toHaveBeenCalledWith(comp.localList[1]);

  });

  it('should display a message when there are no product to be shown', () => {

    comp.localList = [];

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div em'));
    let el = de.nativeElement;

    expect(el.textContent).toContain('No hay nuevos productos para añadir');

  });

});