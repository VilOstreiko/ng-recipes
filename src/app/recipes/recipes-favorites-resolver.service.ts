import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../shared/models/recipe.model';
import { RecipesService } from '../shared/services/recipes.service';

@Injectable()
export class RecipesFavoritesResolverService {

  constructor(private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Recipe>>
    | Promise<Array<Recipe>> | Array<Recipe> {
    return this.recipesService.serveFavRecipes();
  }

}
