import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

import { Purchase } from '../models/purchase.model';

@Injectable()
export class PurchasesService {
  purchases: Purchase[];
  purchasesChanged = new Subject<Purchase[]>();
  purchasesUrl = '/purchases';

  constructor(private http: HttpClient) {
  }

  getPurchases() {
    return [...this.purchases];
  }

  servePurchases() {
    return this.http.get<Purchase[]>(this.purchasesUrl)
      .do((data: Purchase[]) => {
        this.purchases = data;
      });
  }

  addPurchase(newPurchase: string | string[]) {
    return this.http.post(this.purchasesUrl, { 'purchases': newPurchase }).subscribe((resBody: Purchase[]) => {
      this.purchases = resBody;
      this.purchasesChanged.next([...this.purchases]);
    });
  }

  deletePurchase(id: string) {
    return this.http.delete(`${this.purchasesUrl}/${id}`).subscribe(() => {
      this.purchases = this.purchases.filter((purchaseItem) => {
        return purchaseItem['id'] !== id;
      });
      this.purchasesChanged.next([...this.purchases]);
    });
  }
}
