import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { OrderState } from '../app/commons';
import { Order } from '../app/order';
import { OrderItem } from '../app/order-item';
import { AuthMock, KitchenMock } from '../test/mocks';

import { KitchenService } from './kitchen.service';
import { AuthenticationManager } from './authentication-manager';

  
describe('Provider: Kitchen Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          KitchenService,
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
    fakeAsync(inject([KitchenService, MockBackend], (kitchenService: KitchenService, mockBackend: MockBackend) => {

    let orderList: Order[] = KitchenMock.mockOrderList;
    for(let i=0; i < orderList.length; i++) {
      orderList[i].state = OrderState.KITCHEN;
    }

    const mockResponse = JSON.stringify(orderList);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    kitchenService.getOrderList();

    tick();

    expect(kitchenService.orderList.length).toEqual(orderList.length);
    kitchenService.orderList.forEach((order: Order, i) => {
      // Not working. Field wise comparison required
      //expect(kitchenService.orderList).toEqual(orderList);

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

  it('should retrieve the given order from the server',
    async(inject([KitchenService, MockBackend], (kitchenService: KitchenService, mockBackend: MockBackend) => {

    const order: Order = KitchenMock.mockOrderList[0];

    const mockResponse = JSON.stringify(order);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    kitchenService.getOrder(order).then((resultOrder: Order) => {

      // Not working. Field wise comparison required
      //expect(resultOrder).toEqual(order);

      expect(resultOrder._id).toEqual(order._id);
      expect(resultOrder.name).toEqual(order.name);
      expect(resultOrder.username).toEqual(order.username);
      expect(resultOrder.items.length).toEqual(order.items.length);
      resultOrder.items.forEach((orderItem: OrderItem, i) => {
        expect(orderItem.amount).toEqual(order.items[i].amount);
        expect(orderItem.product._id).toEqual(order.items[i].product._id);
        expect(orderItem.product.name).toEqual(order.items[i].product.name);
        expect(orderItem.product.price).toEqual(order.items[i].product.price);
        expect(orderItem.product.category).toEqual(order.items[i].product.category);
        expect(orderItem.product.ingredients).toEqual(order.items[i].product.ingredients);
      });
      expect(resultOrder.state).toEqual(order.state);


    });

  })));

  it('should retrieve the given order updated from the server', fakeAsync(
    inject([KitchenService, MockBackend], (kitchenService: KitchenService, mockBackend: MockBackend) => {

    kitchenService.orderList = KitchenMock.mockOrderList;
    for(let i=0; i < kitchenService.orderList.length; i++) {
      kitchenService.orderList[i].state = OrderState.KITCHEN;
    }

    let order: Order = kitchenService.orderList[0];
    order.state = OrderState.SERVED;

    const mockResponse = JSON.stringify(order);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    kitchenService.updateOrder(order);

    tick();

    expect(kitchenService.orderList[0].state).toEqual(OrderState.SERVED);

  })));

  it('should remove the given order', fakeAsync(
    inject([KitchenService, MockBackend], (kitchenService: KitchenService, mockBackend: MockBackend) => {

    kitchenService.orderList = KitchenMock.mockOrderList;

    const mockResponse = JSON.stringify(true);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    let currentLength = kitchenService.orderList.length;
    let order = kitchenService.orderList[1];

    expect(kitchenService.orderList).toContain(order);

    kitchenService.removeOrder(order);

    tick();

    expect(kitchenService.orderList.length).toEqual(currentLength - 1);
    expect(kitchenService.orderList).not.toContain(order);

  })));

});