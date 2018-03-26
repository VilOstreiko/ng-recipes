import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/from';

import { PurchasesService } from './purchases.service';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let httpMock: HttpTestingController;
  const purchasesMock = [
    {
      'id': '-L88mkXFPPbi_LbCo5st',
      'purchase': '3 tablespoons butter'
    },
    {
      'id': '-L88mkXGTRq2YmaD-BDU',
      'purchase': '1/4 small onion, chopped'
    }
  ];
  const purchaseMock = ['3 tablespoons butter', '1/4 small onion, chopped'];
  const postPurchaseMock = {
    'purchases': purchaseMock
  };
  const purchaseToRemove = purchasesMock[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [PurchasesService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(PurchasesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPurchases', () => {
    it('should return purchases', () => {
      service.purchases = purchasesMock;
      const purchases = service.getPurchases();

      expect(purchases).toEqual(purchasesMock);
    });
  });

  describe('servePurchases', () => {
    it('should make get http request', () => {
      service.servePurchases().subscribe((data) => {
        expect(data).toEqual(purchasesMock);
      });
      const req = httpMock.expectOne(service.purchasesUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(purchasesMock);
    });

    it('should assign response data to purchases', () => {
      service.servePurchases().subscribe();
      const req = httpMock.expectOne(service.purchasesUrl);

      req.flush(purchasesMock);
      expect(service.purchases).toEqual(purchasesMock);
    });
  });

  describe('addPurchase', () => {
    it('should make post http request', () => {
      service.addPurchase(purchaseMock);
      const req = httpMock.expectOne(service.purchasesUrl);

      req.flush('');
      expect(req.request.method).toEqual('POST');
    });

    it('should assign response data to purchases', () => {
      service.addPurchase(purchaseMock);
      const req = httpMock.expectOne(service.purchasesUrl);

      req.flush(purchasesMock);
      expect(service.purchases).toEqual(purchasesMock);
    });

    it('should trigger subscription update on response', () => {
      const subscription = service.purchasesChanged.subscribe((data) => {
        expect(data).toEqual(purchasesMock);
      });
      service.addPurchase(purchaseMock);
      const req = httpMock.expectOne(service.purchasesUrl);

      req.flush(purchasesMock);
      subscription.unsubscribe();
    });
  });

  describe('deletePurchase', () => {
    it('should make delete http request', () => {
      service.purchases = purchasesMock;
      service.deletePurchase(purchaseToRemove.id);
      const req = httpMock.expectOne(`${service.purchasesUrl}/${purchaseToRemove.id}`);

      expect(req.request.method).toEqual('DELETE');
      req.flush('');
    });

    it('should remove relevant item from local store', () => {
      service.purchases = purchasesMock;
      service.deletePurchase(purchaseToRemove.id);
      const req = httpMock.expectOne(`${service.purchasesUrl}/${purchaseToRemove.id}`);

      req.flush('');
      expect(service.purchases.indexOf(purchaseToRemove)).toEqual(-1);
    });

    it('should trigger subscription update on response', () => {
      service.purchases = purchasesMock;
      const subscription = service.purchasesChanged.subscribe((data) => {
        expect(data).toEqual(purchasesMock.slice(1, purchasesMock.length));
      });
      service.deletePurchase(purchaseToRemove.id);
      const req = httpMock.expectOne(`${service.purchasesUrl}/${purchaseToRemove.id}`);

      req.flush('');
      subscription.unsubscribe();
    });
  });

});
