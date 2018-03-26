import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HttpInterceptorService } from './http-interceptor.service';
import * as env from '../../../environments/environment';

describe('HttpInterceptorService', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  const endpoint = '/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpInterceptorService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add apiUrl to input endpoint', () => {
    http.get(endpoint).subscribe();

    const httpReq = httpMock.expectOne(req =>
      req.url === `${env.environment.apiUrl}${endpoint}`);

    expect(httpReq.request.method).toEqual('GET');
    httpReq.flush('');
  });
})
;
