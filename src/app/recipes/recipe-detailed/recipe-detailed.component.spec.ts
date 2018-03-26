import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

import { RecipeDetailedComponent } from './recipe-detailed.component';
import { RecipesService } from '../../shared/services/recipes.service';
import { PurchasesService } from '../../shared/services/purchases.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { Recipe } from '../../shared/models/recipe.model';

class ActivatedRouteStub {
  snapshot = {
    params: { id: 1 }
  };
}

describe('RecipeDetailedComponent', () => {
  let component: RecipeDetailedComponent;
  let fixture: ComponentFixture<RecipeDetailedComponent>;
  let categoriesService: CategoriesService;
  let recipesService: RecipesService;
  let purchasesService: PurchasesService;
  let chosenRecipe: Recipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [RecipeDetailedComponent],
      providers: [
        CategoriesService,
        RecipesService,
        PurchasesService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }]
    });
  });

  beforeEach(() => {
    chosenRecipe = {
      id: 'testId',
      title: 'Sicilian Roasted Chicken',
      description: 'Chicken pieces seasoned with paprika, garlic powder, and oregano are roasted until juicy and tender in this simple Sicilian-inspired recipe.',
      photoUrl: 'http://images.media-allrecipes.com/userphotos/560x315/3922864.jpg',
      ingredients: ['1 whole chicken', '1 teaspoon salt', '1 teaspoon ground black pepper', '1 teaspoon ground paprika', '1 teaspoon garlic powder', '1 teaspoon dried oregano'],
      instructions: 'Preheat oven to 425 degrees F (220 degrees C). Grease a 9x13-inch pan with cooking spray. Arrange chicken pieces in the baking pan. Sprinkle salt, pepper, paprika, garlic powder, and oregano over both sides. Roast in the preheated oven until chicken is browned and the juices run clear, about 1 hour. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C).',
      categoryId: '-L4N7j92qDMvS8BbgE5u',
      likes: 0,
      isFavorite: false
    };
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('OnInit', () => {
    const categoryNameMock = 'test';
    let categoryNameSpy;

    beforeEach(() => {
      recipesService = TestBed.get(RecipesService);
      recipesService.chosenRecipe = chosenRecipe;

      categoriesService = TestBed.get(CategoriesService);
      categoryNameSpy = spyOn(categoriesService, 'getCategoryName').and.returnValue(Observable.of(categoryNameMock));

      fixture = TestBed.createComponent(RecipeDetailedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it((`should set id from route param 'id'`), () => {
      expect(component.id).toEqual(1);
    });

    it(('should set recipe in recipe variable'), () => {
      expect(component.recipe).toEqual(chosenRecipe);
    });

    it(('should set category name in variable'), () => {
      expect(component.categoryName).toEqual(categoryNameMock);
    });

    it('should trigger subscription with updated recipe', () => {
      const newRecipe = {
        id: '',
        title: '',
        description: '',
        photoUrl: '',
        ingredients: [''],
        instructions: '',
        categoryId: '',
        likes: 1,
        isFavorite: false
      };
      Object.assign(newRecipe, chosenRecipe);
      recipesService.chosenRecipeChanged.next(newRecipe);

      expect(component.recipe).toEqual(newRecipe);
    });
  });

  describe('handleFavorite', () => {
    let addFavSpy;
    let deleteFavSpy;
    let recipeId;

    beforeEach(() => {
      recipesService = TestBed.get(RecipesService);
      recipesService.chosenRecipe = chosenRecipe;
      recipeId = chosenRecipe.id;

      addFavSpy = spyOn(recipesService, 'addFavRecipe');
      deleteFavSpy = spyOn(recipesService, 'deleteFavRecipe');

      fixture = TestBed.createComponent(RecipeDetailedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('if recipe is favorite', () => {
      beforeEach(() => {
        component.recipe.isFavorite = true;
        component.handleFavorite();
      });
      it((`should call recipesService deleteFavRecipe method`), () => {
        expect(deleteFavSpy).toHaveBeenCalledWith(recipeId);
      });

      it((`should not call recipesService addFavRecipe method`), () => {
        expect(addFavSpy).not.toHaveBeenCalledWith(recipeId);
      });
    });

    describe('if recipe is not favorite', () => {
      beforeEach(() => {
        component.recipe.isFavorite = false;
        component.handleFavorite();
      });
      it((`should call recipesService addFavRecipe method`), () => {
        expect(addFavSpy).toHaveBeenCalledWith(recipeId);
      });

      it((`should not call recipesService deleteFavRecipe method`), () => {
        expect(deleteFavSpy).not.toHaveBeenCalledWith(recipeId);
      });
    });

  });

  describe('addPurchases', () => {
    const purchaseMock = ['test'];
    let addPurchasesSpy;

    beforeEach(() => {
      purchasesService = TestBed.get(PurchasesService);

      addPurchasesSpy = spyOn(purchasesService, 'addPurchase');

      fixture = TestBed.createComponent(RecipeDetailedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(() => {
      component.recipe.ingredients = purchaseMock;
      component.addPurchases();
    });

    it((`should call purchasesService addPurchase method`), () => {
      expect(addPurchasesSpy).toHaveBeenCalledWith(purchaseMock);
    });
  });
});
