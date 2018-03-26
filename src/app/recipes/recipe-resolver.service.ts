import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RecipesService } from '../shared/services/recipes.service';
import { Recipe } from '../shared/models/recipe.model';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe> {

  constructor(private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipesService.serveRecipe(route.params['id']);
  }
}
