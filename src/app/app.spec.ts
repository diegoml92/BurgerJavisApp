import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
import { SplashScreenMock, StatusBarMock } from '../test/mocks';
 
let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
 
describe('Component: App Component', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [AppComponent],
 
      providers: [
        {
          provide: StatusBar,
          useClass: StatusBarMock
        },
        {
          provide: SplashScreen,
          useClass: SplashScreenMock
        }
      ],
 
      imports: [
        IonicModule.forRoot(AppComponent)
      ]
 
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(AppComponent);
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

  it('displays the login page to the user', () => {

    expect(comp['rootPage']).toBe(LoginComponent);

  });
 
});