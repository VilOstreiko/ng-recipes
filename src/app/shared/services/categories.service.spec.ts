import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpMock: HttpTestingController;
  const categoriesMock = [
    {
      'id': '-L4N7j8yE8Thcztca1S_',
      'name': 'Appetizer'
    },
    {
      'id': '-L4N7j92qDMvS8BbgE5t',
      'name': 'Soup'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [CategoriesService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(CategoriesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('serveCategories', () => {
    it('should make get http request', () => {
      service.serveCategories().subscribe((data) => {
        expect(data).toEqual(categoriesMock);
      });
      const req = httpMock.expectOne(service.categoriesUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(categoriesMock);
    });

  });

  describe('getCategoryName', () => {
    it('should make get http request', () => {
      service.getCategoryName(categoriesMock[0].id).subscribe();
      const req = httpMock.expectOne(service.categoriesUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(categoriesMock);
    });

    it('should return category name if found', () => {
      service.getCategoryName(categoriesMock[0].id).subscribe((data) => {
        expect(data).toEqual(categoriesMock[0].name);
      });
      const req = httpMock.expectOne(service.categoriesUrl);

      req.flush(categoriesMock);
    });

    it(`should return 'none' string if any category found`, () => {
      service.getCategoryName('null').subscribe((data) => {
        expect(data).toContain('none');
      });
      const req = httpMock.expectOne(service.categoriesUrl);

      req.flush(categoriesMock);
    });
  });

});
