import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { MockBackend } from '@angular/http/testing';

import { Category } from '../app/category';
import { AuthMock, CategoryMock } from '../test/mocks';
import { HttpBrowser } from '../browser/http-browser';

import { CategoryService } from './category.service';
import { AuthenticationManager } from './authentication-manager';

  
describe('Provider: Category Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          CategoryService,
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

  it('should retreive the category list from the server',
    fakeAsync(inject([CategoryService, MockBackend], (categoryService: CategoryService, mockBackend: MockBackend) => {

    let categoryList: Category[] = CategoryMock.mockCategoryList;

    const mockResponse = JSON.stringify(categoryList);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    categoryService.getCategoryList();

    tick();

    expect(categoryService.categoryList.length).toEqual(categoryList.length);
    expect(categoryService.categoryList).toEqual(categoryList);

  })));

  it('should create the given category', fakeAsync(
    inject([CategoryService, MockBackend], (categoryService: CategoryService, mockBackend: MockBackend) => {

    categoryService.categoryList = CategoryMock.mockCategoryList;

    let category: Category = new Category('NewCategory', false);

    const mockResponse = JSON.stringify(category);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = categoryService.categoryList.length;
    expect(categoryService.categoryList).not.toContain(category);

    categoryService.addCategory(category);

    tick();

    expect(categoryService.categoryList.length).toEqual(currentLength + 1);
    // Not working
    //expect(categoryService.categoryList).toContain(category);
    expect(JSON.stringify(categoryService.categoryList)).toContain(JSON.stringify(category));

  })));

  it('should retrieve the given category updated from the server', fakeAsync(
    inject([CategoryService, MockBackend], (categoryService: CategoryService, mockBackend: MockBackend) => {

    categoryService.categoryList = CategoryMock.mockCategoryList;

    let category: Category = categoryService.categoryList[0];
    category.favorite = true;

    const mockResponse = JSON.stringify(category);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    categoryService.updateCategory(category);

    tick();

    expect(categoryService.categoryList[0].favorite).toEqual(category.favorite);

  })));

  it('should remove the given category', fakeAsync(
    inject([CategoryService, MockBackend], (categoryService: CategoryService, mockBackend: MockBackend) => {

    categoryService.categoryList = CategoryMock.mockCategoryList;

    const mockResponse = JSON.stringify(true);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = categoryService.categoryList.length;
    let category = categoryService.categoryList[1];

    expect(categoryService.categoryList).toContain(category);

    categoryService.removeCategory(category);

    tick();

    expect(categoryService.categoryList.length).toEqual(currentLength - 1);
    expect(categoryService.categoryList).not.toContain(category);

  })));

  it('should check if an category with the given name already exists', async(
    inject([CategoryService], (categoryService: CategoryService) => {

    categoryService.categoryList = CategoryMock.mockCategoryList;

    const notExistingName: string = 'NewName';
    const existingName: string = categoryService.categoryList[1].name;

    categoryService.checkCategoryName(notExistingName).then(response => {
      expect(response).toBeNull();
    });

    categoryService.checkCategoryName(existingName).then(response => {
      expect(response).toEqual('Category name is taken');
    });

  })));

});