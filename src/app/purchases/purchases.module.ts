import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PurchasesResolverService } from './purchases-resolver.service';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { PurchasesComponent } from './purchases.component';
import { PurchasesRoutingModule } from './purchases-routing.module';

@NgModule({
  declarations: [
    AddPurchaseComponent,
    PurchasesListComponent,
    PurchasesComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    PurchasesRoutingModule
  ],
  providers: [
    PurchasesResolverService
  ]
})
export class PurchasesModule {
}
