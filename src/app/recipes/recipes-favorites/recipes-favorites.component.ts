import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-recipes-favorites',
  templateUrl: './recipes-favorites.component.html',
  styleUrls: ['./recipes-favorites.component.scss']
})
export class RecipesFavoritesComponent implements OnInit {
  recipes: Array<Recipe>;

  constructor() {
  }

  ngOnInit() {
  }
}
