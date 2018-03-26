import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PurchasesService } from '../shared/services/purchases.service';
import { Purchase } from '../shared/models/purchase.model';

@Injectable()
export class PurchasesResolverService implements Resolve<Array<Purchase>> {

  constructor(private purchasesService: PurchasesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Purchase>>
    | Promise<Array<Purchase>> | Array<Purchase> {
    return this.purchasesService.servePurchases();
  }
}
