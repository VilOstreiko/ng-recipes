import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe>;
  recipesListSubscription: Subscription;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipesListSubscription = this.recipesService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  ngOnDestroy() {
    this.recipesListSubscription.unsubscribe();
  }
}
