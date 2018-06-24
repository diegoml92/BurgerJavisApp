import { TestBed, async, inject } from '@angular/core/testing';
import { Headers } from '@angular/http';

import { MenuController } from 'ionic-angular';
import { Credentials } from '../app/credentials';
import { ROLE_ADMIN, ROLE_WAITER, ROLE_KITCHEN, BASIC_PREFIX, 
  JSON_HEADER_NAME, JSON_HEADER_VALUE } from '../app/commons';
import { AuthenticationManager } from './authentication-manager';
import { MenuControllerMock } from '../test/mocks';
  
describe('Provider: AuthenticationManager service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          AuthenticationManager,
          {
            provide: MenuController,
            useClass: MenuControllerMock
          }
      ],

      imports: [

      ]

    }).compileComponents();
 
  }));

  beforeEach(() => {});

  it('it should set and return the given credentials', 
    inject([AuthenticationManager], (authManager: AuthenticationManager) => {

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);

    authManager.setCredentials(credentials);

    expect(authManager.getCredentials()).toEqual(credentials);

  }));

  it('should reset the current credentials',
    inject([AuthenticationManager], (authManager: AuthenticationManager) => {

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);

    authManager.setCredentials(credentials);

    expect(authManager.getCredentials()).toEqual(credentials);

    authManager.resetCredentials();

    expect(authManager.getCredentials()).toEqual(new Credentials());

  }));

  it('should return the current credentials role',
    inject([AuthenticationManager], (authManager: AuthenticationManager) => {

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);
    let credentials2: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN, ROLE_WAITER ]);

    authManager.setCredentials(credentials);

    expect(authManager.getRole()).toEqual(ROLE_ADMIN);

  }));

  it('should return whether the credentials role is admin or not',
    inject([AuthenticationManager], (authManager: AuthenticationManager) => {

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);
    let credentials2: Credentials = new Credentials('user2', 'pass2', [ ROLE_WAITER ]);

    authManager.setCredentials(credentials);

    expect(authManager.isAdmin()).toBeTruthy();

    authManager.setCredentials(credentials2);

    expect(authManager.isAdmin()).toBeFalsy();

  }));

  it('should enable side menu for corresponding role',
    inject([AuthenticationManager, MenuController],
      (authManager: AuthenticationManager, menuCtrl: MenuControllerMock) => {

    spyOn(menuCtrl, 'enable');

    const NO_ROLE = "NO ROLE";

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);
    let credentials2: Credentials = new Credentials('user2', 'pass2', [ ROLE_WAITER ]);
    let credentials3: Credentials = new Credentials('user3', 'pass3', [ ROLE_KITCHEN ]);
    let credentials4: Credentials = new Credentials('user4', 'pass4', [ ROLE_ADMIN, ROLE_KITCHEN ]);
    let credentials5: Credentials = new Credentials('user5', 'pass5', [ NO_ROLE ]);

    authManager.setCredentials(credentials);
    expect(menuCtrl.enable).toHaveBeenCalledWith(true, 'adminMenu');

    authManager.setCredentials(credentials2);
    expect(menuCtrl.enable).toHaveBeenCalledWith(true, 'waiterMenu');

    authManager.setCredentials(credentials3);
    expect(menuCtrl.enable).toHaveBeenCalledWith(true, 'kitchenMenu');

    let fail1 = function() {
      authManager.setCredentials(credentials4);
    };
    let fail2 = function() {
      authManager.setCredentials(credentials5);
    }

    expect(fail1).toThrow("Invalid user with multiple roles");
    expect(fail2).toThrow("Invalid user role: " + NO_ROLE);

  }));

  it('should generate the corresponding authentication header',
    inject([AuthenticationManager], (authManager: AuthenticationManager) => {

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);

    authManager.setCredentials(credentials);

    let header: Headers = new Headers
      ({'Authorization': BASIC_PREFIX + new Buffer('user:pass').toString('base64')});

    expect(authManager.generateAuthHeader()).toEqual(header);

    let credentials2: Credentials = new Credentials('', '', [ ROLE_ADMIN ]);

    authManager.setCredentials(credentials2);

    expect(authManager.generateAuthHeader()).toEqual(new Headers());

  }));

  it('should generate the corresponding authentication and JSON headers',
    inject([AuthenticationManager], (authManager: AuthenticationManager) => {

    let credentials: Credentials = new Credentials('user', 'pass', [ ROLE_ADMIN ]);

    authManager.setCredentials(credentials);

    let headers: Headers = new Headers();
    headers.append(JSON_HEADER_NAME, JSON_HEADER_VALUE);
    headers.append('Authorization', BASIC_PREFIX + new Buffer('user:pass').toString('base64'))

    expect(authManager.generateJsonAuthHeader()).toEqual(headers);

  }));
 
});