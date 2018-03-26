import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Recipe } from '../../shared/models/recipe.model';
import { UrlValidator } from '../../shared/validators/url-validator';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() btnAction: string;
  @Input() oldRecipe: Recipe;
  @Output() onSubmitForm = new EventEmitter<Recipe>();
  recipeForm: FormGroup;
  recipe: Recipe;
  categories: Category[];
  titleMaxLength = 50;
  photoUrlRegExp = /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpe?g|gif|png|svg))(?:\?([^#]*))?(?:#(.*))?/;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.initForm();
    this.categoriesService.serveCategories()
      .subscribe((categoriesList) => {
        this.categories = categoriesList;
      });

    if (this.oldRecipe) {
      this.fillEditForm();
    }
  }

  initForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null,
        [Validators.required, Validators.maxLength(this.titleMaxLength)]),
      'description': new FormControl(null,
        [Validators.required]),
      'photoUrl': new FormControl(null,
        [Validators.required, UrlValidator(this.photoUrlRegExp)]),
      'ingredients': new FormArray([]),
      'instructions': new FormControl(null,
        [Validators.required]),
      'categoryId': new FormControl(null,
        [Validators.required])
    });
  }

  fillEditForm() {
    this.recipeForm.patchValue({
      'title': this.oldRecipe.title,
      'description': this.oldRecipe.description,
      'photoUrl': this.oldRecipe.photoUrl,
      'instructions': this.oldRecipe.instructions,
      'categoryId': this.oldRecipe.categoryId
    });
    this.oldRecipe.ingredients.forEach((ingredient) => {
      this.ingredients.push(new FormControl(ingredient));
    });
  }

  addIngredient() {
    this.ingredients.push(new FormControl(null));
  }

  removeIngredient(ind) {
    this.ingredients.removeAt(ind);
  }

  submitForm() {
    this.recipe = this.recipeForm.value;
    this.recipe.likes = !this.oldRecipe
      ? 0
      : this.oldRecipe.likes;
    this.recipeForm.reset();
    this.onSubmitForm.emit(this.recipe);
  }

  get title() {
    return this.recipeForm.get('title');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get photoUrl() {
    return this.recipeForm.get('photoUrl');
  }

  get instructions() {
    return this.recipeForm.get('instructions');
  }

  get category() {
    return this.recipeForm.get('categoryId');
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
}
