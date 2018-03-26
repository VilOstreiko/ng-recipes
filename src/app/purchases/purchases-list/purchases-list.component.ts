import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PurchasesService } from '../../shared/services/purchases.service';
import { Purchase } from '../../shared/models/purchase.model';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss']
})
export class PurchasesListComponent implements OnInit, OnDestroy {
  purchases: Purchase[];
  purchasesChangedSubscription: Subscription;

  constructor(private purchasesService: PurchasesService) {
  }

  ngOnInit() {
    this.purchases = this.purchasesService.getPurchases();
    this.purchasesChangedSubscription = this.purchasesService.purchasesChanged.subscribe((newPurchases: Purchase[]) => {
      this.purchases = newPurchases;
    });
  }

  deleteIngredient(id: string) {
    this.purchasesService.deletePurchase(id);
  }

  ngOnDestroy() {
    this.purchasesChangedSubscription.unsubscribe();
  }
}
