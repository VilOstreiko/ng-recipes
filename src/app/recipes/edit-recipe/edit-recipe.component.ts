import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipe = this.recipesService.getRecipe();
  }

  editRecipe(newRecipe: Recipe) {
    newRecipe['id'] = this.id;
    this.recipesService.editRecipe(newRecipe).subscribe(() => {
      this.router.navigate(['recipes', this.id]);
    });
  }
}
