import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasesComponent } from './purchases.component';
import { PurchasesResolverService } from './purchases-resolver.service';

const purchasesRoutes: Routes = [
  {
    path: '', component: PurchasesComponent,
    resolve: { ingredients: PurchasesResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(purchasesRoutes)],
  exports: [RouterModule],
  providers: [PurchasesResolverService]
})
export class PurchasesRoutingModule {
}
