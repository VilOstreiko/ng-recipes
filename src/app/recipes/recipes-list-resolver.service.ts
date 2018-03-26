import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../shared/models/recipe.model';
import { RecipesService } from '../shared/services/recipes.service';

@Injectable()
export class RecipesListResolverService implements Resolve<Array<Recipe>> {

  constructor(private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Recipe>> | Promise<Array<Recipe>> | Array<Recipe> {
    return this.recipesService.serveRecipes();
  }
}
