import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, LoadingController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { SummaryComponent } from '../summary/summary.component';
import { SummaryService } from '../../providers/summary.service';
import { SummaryMock, LoadingControllerMock } from '../../test/mocks';
 
let comp: SummaryComponent;
let fixture: ComponentFixture<SummaryComponent>;
let de: DebugElement;
 
describe('Component: Summary Component', () => {
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
 
      declarations: [AppComponent, SummaryComponent],
 
      providers: [
        {
          provide: SummaryService,
          useClass: SummaryMock
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

      fixture = TestBed.createComponent(SummaryComponent);
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

  it('should display Summary view correctly', fakeAsync(() => {

    fixture.detectChanges();

    // summary data is not loaded yet
    de = fixture.debugElement.query(By.css('div em'));

    expect(de).not.toBeNull();
    expect(de.nativeElement.textContent).toContain('No hay datos disponibles');

    // SummaryData is loaded in ionViewWillEnter method
    comp.ionViewWillEnter();

    tick();

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div em'));

    expect(de).toBeNull();

    // title
    de = fixture.debugElement.query(By.css('ion-title'));

    expect(de.nativeElement.textContent).toContain('Resumen');

    // content
    de = fixture.nativeElement.querySelectorAll('ion-list ion-item');
    let el: HTMLElement;

    el = de[0];
    expect(el.innerHTML).toContain('cash');
    expect(el.textContent).toContain('Beneficios');
    expect(el.textContent).toContain('€' + SummaryMock.mockData.profits);

    el = de[1]
    expect(el.innerHTML).toContain('checkmark-circle-outline');
    expect(el.textContent).toContain('Pedidos completados');
    expect(el.textContent).toContain(SummaryMock.mockData.completedOrders.toString());

    el = de[2]
    expect(el.innerHTML).toContain('podium');
    expect(el.textContent).toContain('Mejores productos');

    // top products
    de = fixture.nativeElement.querySelectorAll('ion-list ion-list');
    comp.summaryData.topCategories.forEach((category, i) => {

      expect(de[i].textContent).toContain(category.name);
      let aux = de[i].querySelectorAll('ion-item');

      comp.summaryData.topProducts[i].forEach((product, j) => {

        expect(aux[j].textContent).toContain(product.productName);
        expect(aux[j].textContent).toContain(product.amount);

      });


    });

  }));

});