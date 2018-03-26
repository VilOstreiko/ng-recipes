import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { RecipesService } from '../shared/services/recipes.service';
import { CategoriesService } from '../shared/services/categories.service';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailedComponent } from './recipe-detailed/recipe-detailed.component';
import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { RecipesFavoritesComponent } from './recipes-favorites/recipes-favorites.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesAllComponent } from './recipes-all/recipes-all.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipeFormComponent,
    RecipeDetailedComponent,
    RecipesListComponent,
    RecipesItemComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    RecipesFavoritesComponent,
    RecipesAllComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RecipesRoutingModule
  ],
  providers: [
    RecipesService,
    CategoriesService
  ]
})
export class RecipesModule {
}
