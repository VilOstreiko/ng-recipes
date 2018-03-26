import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesListResolverService } from './recipes-list-resolver.service';
import { RecipeResolverService } from './recipe-resolver.service';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailedComponent } from './recipe-detailed/recipe-detailed.component';
import { RecipesFavoritesComponent } from './recipes-favorites/recipes-favorites.component';
import { RecipesAllComponent } from './recipes-all/recipes-all.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesFavoritesResolverService } from './recipes-favorites-resolver.service';

const recipesRoutes: Routes = [
  { path: '', component: RecipesAllComponent, resolve: { recipes: RecipesListResolverService } },
  { path: 'favorites', component: RecipesFavoritesComponent, resolve: { recipes: RecipesFavoritesResolverService } },
  { path: 'create', component: AddRecipeComponent },
  { path: 'edit/:id', component: EditRecipeComponent, resolve: { recipe: RecipeResolverService } },
  { path: ':id', component: RecipeDetailedComponent, resolve: { recipe: RecipeResolverService } },
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule],
  providers: [
    RecipesListResolverService,
    RecipesFavoritesResolverService,
    RecipeResolverService
  ]
})
export class RecipesRoutingModule {
}
