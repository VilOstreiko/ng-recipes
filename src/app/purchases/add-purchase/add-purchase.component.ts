import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchasesService } from '../../shared/services/purchases.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  @ViewChild('purchasesForm') purchasesForm: NgForm;

  constructor(private purchasesService: PurchasesService) {
  }

  ngOnInit() {
  }

  addIngredient() {
    this.purchasesService.addPurchase(this.purchasesForm.value.newIngredient);
    this.purchasesForm.reset();
  }
}
