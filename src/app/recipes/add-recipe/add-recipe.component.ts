import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../../shared/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  constructor(private recipesService: RecipesService,
              private router: Router) {
  }

  ngOnInit() {
  }

  addRecipe(recipe: Recipe) {
    this.recipesService.addRecipe(recipe).subscribe((recipeId) => {
      this.router.navigate(['/recipes', recipeId]);
    });
  }
}
