import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../../shared/models/recipe.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { RecipesService } from '../../shared/services/recipes.service';
import { Subscription } from 'rxjs/Subscription';
import { PurchasesService } from '../../shared/services/purchases.service';

@Component({
  selector: 'app-recipe-detailed',
  templateUrl: './recipe-detailed.component.html',
  styleUrls: ['./recipe-detailed.component.scss']
})
export class RecipeDetailedComponent implements OnInit {
  recipe: Recipe;
  id: number;
  categoryName: string;
  recipeSubscription: Subscription;

  constructor(private categoriesService: CategoriesService,
              private recipesService: RecipesService,
              private purchasesService: PurchasesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipe = this.recipesService.getRecipe();

    this.categoriesService.getCategoryName(this.recipe.categoryId)
      .subscribe(categoryName => this.categoryName = categoryName);

    this.recipeSubscription = this.recipesService.chosenRecipeChanged
      .subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;
        }
      );
  }

  handleFavorite() {
    if (this.recipe.isFavorite) {
      this.recipesService.deleteFavRecipe(this.recipe.id);
    } else {
      this.recipesService.addFavRecipe(this.recipe.id);
    }
  }

  addPurchases() {
    this.purchasesService.addPurchase(this.recipe.ingredients);
  }
}
