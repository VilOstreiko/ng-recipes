import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipesService {
  recipes: Recipe[];
  chosenRecipe: Recipe;
  recipesChanged = new Subject<Recipe[]>();
  chosenRecipeChanged = new Subject<Recipe>();
  recipesUrl = '/recipes';
  recipesFavoritesUrl = '/favorites';

  constructor(private http: HttpClient) {
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  serveRecipes() {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .do((data: Recipe[]) => {
        this.recipes = data;
      });
  }

  serveFavRecipes() {
    return this.http.get<Recipe[]>(this.recipesFavoritesUrl)
      .do((data: Recipe[]) => {
        this.recipes = data;
      });
  }

  getRecipe() {
    return { ...this.chosenRecipe };
  }

  serveRecipe(id: string) {
    return this.http.get<Recipe>(`${this.recipesUrl}/${id}`)
      .do((recipe: Recipe) => {
        this.chosenRecipe = recipe;
      });
  }

  addRecipe(recipeData: Recipe) {
    return this.http.post(this.recipesUrl, recipeData);
  }

  editRecipe(recipeData: Recipe) {
    return this.http.put(this.recipesUrl, recipeData);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.recipesUrl}/${id}`, { observe: 'response' }).do(() => {
      this.recipes = this.recipes.filter((recipe) => {
        return recipe['id'] !== id;
      });
      this.recipesChanged.next([...this.recipes]);
    });
  }

  updateRate(updatedRecipe: Recipe) {
    let changed = false;
    this.recipes.forEach(
      (recipe, index) => {
        if (!changed) {
          if (recipe['id'] === updatedRecipe['id']) {
            this.recipes[index] = updatedRecipe;
            changed = true;
          }
        }
      });
  }

  likeRecipe(id: string) {
    return this.http.post(`${this.recipesUrl}/likes`, { id })
      .subscribe((updatedRecipe: Recipe) => {
        this.updateRate(updatedRecipe);
        this.recipesChanged.next([...this.recipes]);
      });
  }

  dislikeRecipe(id: string) {
    return this.http.post(`${this.recipesUrl}/dislikes`, { id })
      .subscribe((updatedRecipe: Recipe) => {
        this.updateRate(updatedRecipe);
        this.recipesChanged.next([...this.recipes]);
      });
  }

  addFavRecipe(id: string) {
    return this.http.post(this.recipesFavoritesUrl, { id }).subscribe(() => {
      this.chosenRecipe.isFavorite = true;
      this.chosenRecipeChanged.next({ ...this.chosenRecipe });
    });
  }

  deleteFavRecipe(id: string) {
    return this.http.delete(`${this.recipesFavoritesUrl}/${id}`).subscribe(() => {
      this.chosenRecipe.isFavorite = false;
      this.chosenRecipeChanged.next({ ...this.chosenRecipe });
    });
  }
}
