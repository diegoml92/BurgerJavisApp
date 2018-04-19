import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { MockBackend } from '@angular/http/testing';

import { Ingredient } from '../app/ingredient';
import { AuthMock, IngredientMock } from '../test/mocks';
import { HttpBrowser } from '../browser/http-browser';

import { IngredientService } from './ingredient.service';
import { AuthenticationManager } from './authentication-manager';

  
describe('Provider: Ingredient Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          IngredientService,
          {
            provide: AuthenticationManager,
            useClass: AuthMock
          },
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
          }
      ],

      imports: [
        HttpModule
      ]

    }).compileComponents();
 
  }));

  beforeEach(() => {});

  it('should retreive the ingredient list from the server',
    fakeAsync(inject([IngredientService, MockBackend], (ingredientService: IngredientService, mockBackend: MockBackend) => {

    let ingredientList: Ingredient[] = IngredientMock.mockIngredientList;

    const mockResponse = JSON.stringify(ingredientList);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    ingredientService.getIngredientList();

    tick();

    expect(ingredientService.ingredientList.length).toEqual(ingredientList.length);
    expect(ingredientService.ingredientList).toEqual(ingredientList);

  })));

  it('should create the given Ingredient', fakeAsync(
    inject([IngredientService, MockBackend], (ingredientService: IngredientService, mockBackend: MockBackend) => {

    ingredientService.ingredientList = IngredientMock.mockIngredientList;

    let ingredient: Ingredient = new Ingredient('NewIngredient');

    const mockResponse = JSON.stringify(ingredient);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = ingredientService.ingredientList.length;
    expect(ingredientService.ingredientList).not.toContain(ingredient);

    ingredientService.addIngredient(ingredient);

    tick();

    expect(ingredientService.ingredientList.length).toEqual(currentLength + 1);
    // Not working
    //expect(ingredientService.ingredientList).toContain(ingredient);
    expect(JSON.stringify(ingredientService.ingredientList)).toContain(JSON.stringify(ingredient));

  })));

  it('should retrieve the given ingredient updated from the server', fakeAsync(
    inject([IngredientService, MockBackend], (ingredientService: IngredientService, mockBackend: MockBackend) => {

    ingredientService.ingredientList = IngredientMock.mockIngredientList;

    let ingredient: Ingredient = ingredientService.ingredientList[0];
    ingredient.name = 'UpdatedName';

    const mockResponse = JSON.stringify(ingredient);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    ingredientService.updateIngredient(ingredient);

    tick();

    expect(ingredientService.ingredientList[0].name).toEqual(ingredient.name);

  })));

  it('should remove the given ingredient', fakeAsync(
    inject([IngredientService, MockBackend], (ingredientService: IngredientService, mockBackend: MockBackend) => {

    ingredientService.ingredientList = IngredientMock.mockIngredientList;

    const mockResponse = JSON.stringify(true);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = ingredientService.ingredientList.length;
    let ingredient = ingredientService.ingredientList[1];

    expect(ingredientService.ingredientList).toContain(ingredient);

    ingredientService.removeIngredient(ingredient);

    tick();

    expect(ingredientService.ingredientList.length).toEqual(currentLength - 1);
    expect(ingredientService.ingredientList).not.toContain(ingredient);

  })));

  it('should check if an ingredient with the given name already exists', async(
    inject([IngredientService], (ingredientService: IngredientService) => {

    ingredientService.ingredientList = IngredientMock.mockIngredientList;

    const notExistingName: string = 'NewName';
    const existingName: string = ingredientService.ingredientList[1].name;

    ingredientService.checkIngredientName(notExistingName).then(response => {
      expect(response).toBeNull();
    });

    ingredientService.checkIngredientName(existingName).then(response => {
      expect(response).toEqual('Ingredient name is taken');
    });

  })));

});