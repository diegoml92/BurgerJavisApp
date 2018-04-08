import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Product } from './product';
import { AuthMock, ProductMock } from '../test/mocks';

import { ProductService } from './product.service';
import { AuthenticationManager } from './authentication-manager';

  
describe('Provider: Product Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          ProductService,
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
          }
      ],

      imports: [
        HttpModule
      ]

    }).compileComponents();
 
  }));

  beforeEach(() => {});

  it('should retreive the product list from the server',
    fakeAsync(inject([ProductService, MockBackend], (productService: ProductService, mockBackend: MockBackend) => {

    let productList: Product[] = ProductMock.mockProductList;

    const mockResponse = JSON.stringify(productList);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    productService.getProductList();

    tick();

    expect(productService.productList.length).toEqual(productList.length);
    expect(productService.productList).toEqual(productList);

  })));

  it('should create the given product', fakeAsync(
    inject([ProductService, MockBackend], (productService: ProductService, mockBackend: MockBackend) => {

    productService.productList = ProductMock.mockProductList;

    let product: Product = new Product('NewProduct', 5.00);

    const mockResponse = JSON.stringify(product);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = productService.productList.length;
    expect(productService.productList).not.toContain(product);

    productService.addProduct(product);

    tick();

    expect(productService.productList.length).toEqual(currentLength + 1);
    // Not working
    //expect(productService.productList).toContain(product);
    expect(JSON.stringify(productService.productList)).toContain(JSON.stringify(product));

  })));

  it('should retrieve the given product updated from the server', fakeAsync(
    inject([ProductService, MockBackend], (productService: ProductService, mockBackend: MockBackend) => {

    productService.productList = ProductMock.mockProductList;

    let product: Product = productService.productList[0];
    product.price = 9.99;

    const mockResponse = JSON.stringify(product);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    productService.updateProduct(product);

    tick();

    expect(productService.productList[0].price).toEqual(product.price);

  })));

  it('should remove the given product', fakeAsync(
    inject([ProductService, MockBackend], (productService: ProductService, mockBackend: MockBackend) => {

    productService.productList = ProductMock.mockProductList;

    const mockResponse = JSON.stringify(true);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = productService.productList.length;
    let product = productService.productList[1];

    expect(productService.productList).toContain(product);

    productService.removeProduct(product);

    tick();

    expect(productService.productList.length).toEqual(currentLength - 1);
    expect(productService.productList).not.toContain(product);

  })));

  it('should check if an product with the given name already exists', async(
    inject([ProductService], (productService: ProductService) => {

    productService.productList = ProductMock.mockProductList;

    const notExistingName: string = 'NewName';
    const existingName: string = productService.productList[1].name;

    productService.checkProductName(notExistingName).then(response => {
      expect(response).toBeNull();
    });

    productService.checkProductName(existingName).then(response => {
      expect(response).toEqual('Product name is taken');
    });

  })));

});