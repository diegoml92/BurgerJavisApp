import { TestBed, async, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Credentials } from './credentials';
import { ROLE_ADMIN } from './commons';
import { LoginService } from './login.service';
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

  })));
 
});