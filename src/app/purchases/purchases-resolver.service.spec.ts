import { TestBed, inject } from '@angular/core/testing';

import { PurchasesResolverService } from './purchases-resolver.service';

xdescribe('PurchasesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchasesResolverService]
    });
  });

  it('should be created', inject([PurchasesResolverService], (service: PurchasesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
