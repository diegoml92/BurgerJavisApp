import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SummaryMock, AuthMock } from '../test/mocks';

import { SummaryService } from './summary.service';
import { AuthenticationManager } from './authentication-manager';

  
describe('Provider: Summary Service', () => {
 
  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
 
      declarations: [

      ],

      providers: [
          SummaryService,
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

  it('should retrieve summary data from the server',
    fakeAsync(inject([SummaryService, MockBackend], (summaryService: SummaryService, mockBackend: MockBackend) => {

    const summaryData = SummaryMock.mockData;
    const mockResponse = JSON.stringify(summaryData);

    mockBackend.connections.subscribe((connection) => {

      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));

    });

    summaryService.getSummaryData();

    tick();

    expect(summaryService.summaryData.completedOrders).toEqual(summaryData.completedOrders);
    expect(summaryService.summaryData.profits).toEqual(summaryData.profits);
    expect(summaryService.summaryData.topCategories).toEqual(summaryData.topCategories);
    expect(summaryService.summaryData.topProducts).toEqual(summaryData.topProducts);

  })));
 
});