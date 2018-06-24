import { TestBed, async, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { MockBackend } from '@angular/http/testing';

import { Credentials } from '../app/credentials';
import { ROLE_ADMIN } from '../app/commons';
import { LoginService } from './login.service';
import { AuthenticationManager } from './authentication-manager';
import { AuthMock } from '../test/mocks';
import { HttpBrowser } from '../browser/http-browser';
import { compareSync, hashSync } from 'bcryptjs';
  
describe('Provider: Login Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          LoginService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (mockBackend, options) => {
              return new Http(mockBackend, options);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
          {
            provide: HTTP,
            useClass: HttpBrowser
          },
          {
            provide: AuthenticationManager,
            useClass: AuthMock
          }
      ],

      imports: [
        HttpModule
      ]

    }).compileComponents();
 
  }));

  beforeEach(() => {});

  it('should return the credentials received from the server',
    async(inject([LoginService, MockBackend], (loginService: LoginService, mockBackend: MockBackend) => {

    const USERNAME = 'user';
    const PASSWORD = 'pass';

    const mockResponse =
      '{' +
      '  "username" : "' + USERNAME + '",' +
      '  "password" : "' + hashSync(PASSWORD) + '",' +
      '  "roles" : [ "' + ROLE_ADMIN + '" ]' +
      '}';

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let loginData: Credentials = new Credentials(USERNAME, PASSWORD);

    loginService.login(loginData).then(credentials => {

      expect(credentials.username).toEqual(loginData.username);
      expect(compareSync(credentials.password, hashSync(loginData.password))).toBeTruthy();
      expect(credentials.roles[0]).toEqual(ROLE_ADMIN);

    });

    let invalidLoginData: Credentials = new Credentials("", PASSWORD);

    loginService.login(invalidLoginData).then(credentials => {

      expect(credentials).toBeNull();

    });

  })));

  it('should return the list of existing users', 
    async(inject([LoginService, MockBackend], (loginService: LoginService, mockBackend: MockBackend) => {

    const ADMIN = 'admin';
    const USER1 = 'user1';

    const mockResponse = '[ "' + ADMIN + '" , "' + USER1 + '" ]';

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    loginService.getUsernames().then(usernames => {

      expect(usernames.length).toEqual(2);
      expect(usernames[0]).toEqual(ADMIN);
      expect(usernames[1]).toEqual(USER1);

    });

  })));
 
});