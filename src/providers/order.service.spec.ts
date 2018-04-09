import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { OrderState } from '../app/commons';
import { Order } from '../app/order';
import { OrderItem } from '../app/order-item';
import { Product } from '../app/product';
import { AuthMock, OrderMock } from '../test/mocks';

import { OrderService } from './order.service';
import { AuthenticationManager } from './authentication-manager';

  
describe('Provider: Order Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          OrderService,
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

  it('should retreive the order list from the server',
    fakeAsync(inject([OrderService, MockBackend], (orderService: OrderService, mockBackend: MockBackend) => {

    let orderList: Order[] = OrderMock.mockOrderList;

    const mockResponse = JSON.stringify(orderList);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    orderService.getOrderList();

    tick();

    expect(orderService.orderList.length).toEqual(orderList.length);
    orderService.orderList.forEach((order: Order, i) => {
      // Not working. Fieldwise comparison required
      //expect(OrderService.orderList).toEqual(orderList);

      expect(order._id).toEqual(orderList[i]._id);
      expect(order.name).toEqual(orderList[i].name);
      expect(order.username).toEqual(orderList[i].username);
      expect(order.items.length).toEqual(orderList[i].items.length);
      order.items.forEach((orderItem: OrderItem, j) => {
        expect(orderItem.amount).toEqual(orderList[i].items[j].amount);
        expect(orderItem.product._id).toEqual(orderList[i].items[j].product._id);
        expect(orderItem.product.name).toEqual(orderList[i].items[j].product.name);
        expect(orderItem.product.price).toEqual(orderList[i].items[j].product.price);
        expect(orderItem.product.category).toEqual(orderList[i].items[j].product.category);
        expect(orderItem.product.ingredients).toEqual(orderList[i].items[j].product.ingredients);
      });
      expect(order.state).toEqual(orderList[i].state);
    });

  })));

  it('should create the given order', fakeAsync(
    inject([OrderService, MockBackend], (orderService: OrderService, mockBackend: MockBackend) => {

    orderService.orderList = OrderMock.mockOrderList;

    let items: OrderItem[] = [
      {product: new Product("Product1", 5.50), amount: 3},
      {product: new Product("Product2", 1.50), amount: 4}
    ];

    let order: Order = new Order('NewOrder', 'User1', items);

    const mockResponse = JSON.stringify(order);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = orderService.orderList.length;
    expect(orderService.orderList).not.toContain(order);

    orderService.addOrder(order);

    tick();

    expect(orderService.orderList.length).toEqual(currentLength + 1);
    // Not working
    //expect(orderService.orderList).toContain(order);
    expect(JSON.stringify(orderService.orderList)).toContain(JSON.stringify(order));

  })));

  it('should retrieve the given order updated from the server', fakeAsync(
    inject([OrderService, MockBackend], (orderService: OrderService, mockBackend: MockBackend) => {

    orderService.orderList = OrderMock.mockOrderList;

    let order: Order = orderService.orderList[0];
    order.state = OrderState.KITCHEN;

    const mockResponse = JSON.stringify(order);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    orderService.updateOrder(order);

    tick();

    expect(orderService.orderList[0].state).toEqual(order.state);

  })));

  it('should remove the given order', fakeAsync(
    inject([OrderService, MockBackend], (orderService: OrderService, mockBackend: MockBackend) => {

    orderService.orderList = OrderMock.mockOrderList;

    const mockResponse = JSON.stringify(true);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = orderService.orderList.length;
    let order = orderService.orderList[1];

    expect(orderService.orderList).toContain(order);

    orderService.removeOrder(order);

    tick();

    expect(orderService.orderList.length).toEqual(currentLength - 1);
    expect(orderService.orderList).not.toContain(order);

  })));

  it('should check if an order with the given name already exists', async(
    inject([OrderService], (orderService: OrderService) => {

    orderService.orderList = OrderMock.mockOrderList;

    const notExistingName: string = 'NewName';
    const existingName: string = orderService.orderList[1].name;

    orderService.checkOrderName(notExistingName).then(response => {
      expect(response).toBeNull();
    });

    orderService.checkOrderName(existingName).then(response => {
      expect(response).toEqual('Order name is taken');
    });

  })));

});