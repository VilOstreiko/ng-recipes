import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
  }

  deleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe.id).subscribe();
  }

  likeRecipe(id: string) {
    this.recipesService.likeRecipe(id);
  }

  dislikeRecipe(id: string) {
    this.recipesService.dislikeRecipe(id);
  }
}
