import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecipeFormComponent } from './recipe-form.component';
import { Recipe } from '../../shared/models/recipe.model';
import { CategoriesService } from '../../shared/services/categories.service';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;
  let categoriesService: CategoriesService;
  let chosenRecipe: Recipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [RecipeFormComponent],
      providers: [
        CategoriesService
      ]
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
      likes: 100,
      isFavorite: false
    };
    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('OnInit', () => {
    const categoriesListMock = [
      { id: 'testid1', name: 'testname1' },
      { id: 'testid2', name: 'testname2' }
    ];
    let serveCategoriesSpy;
    let initFormSpy;
    let fillEditFormSpy;

    beforeEach(() => {
      categoriesService = TestBed.get(CategoriesService);
      serveCategoriesSpy = spyOn(categoriesService, 'serveCategories').and.returnValue(Observable.from([categoriesListMock]));

      fixture = TestBed.createComponent(RecipeFormComponent);
      component = fixture.componentInstance;
      initFormSpy = spyOn(component, 'initForm').and.callThrough();
      fixture.detectChanges();
    });

    it((`should call 'initForm' method`), () => {
      expect(initFormSpy).toHaveBeenCalled();
    });

    it((`should set categories from categories service`), () => {
      expect(component.categories).toEqual(categoriesListMock);
    });

    describe('if oldRecipe is not undefined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(RecipeFormComponent);
        component = fixture.componentInstance;
        fillEditFormSpy = spyOn(component, 'fillEditForm').and.callThrough();
        component.oldRecipe = null;
        fixture.detectChanges();
      });
      it((`should 'fillEditForm' not have been called`), () => {
        expect(fillEditFormSpy).not.toHaveBeenCalled();
      });
    });

    describe('if oldRecipe is defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(RecipeFormComponent);
        component = fixture.componentInstance;
        fillEditFormSpy = spyOn(component, 'fillEditForm').and.callThrough();
        component.oldRecipe = chosenRecipe;
        fixture.detectChanges();
      });
      it((`should 'fillEditForm' have been called`), () => {
        expect(fillEditFormSpy).toHaveBeenCalled();
      });
    });
  });

  describe('initForm', () => {
    beforeEach(() => {
      categoriesService = TestBed.get(CategoriesService);
    });

    it((`should init form with formControls`), () => {
      expect(component.recipeForm.get('title')).toBeTruthy();
      expect(component.recipeForm.get('description')).toBeTruthy();
      expect(component.recipeForm.get('photoUrl')).toBeTruthy();
      expect(component.recipeForm.get('instructions')).toBeTruthy();
      expect(component.recipeForm.get('categoryId')).toBeTruthy();
      expect(component.recipeForm.get('ingredients')).toBeTruthy();
    });
  });

  describe('fillEditForm', () => {
    beforeEach(() => {
      categoriesService = TestBed.get(CategoriesService);
      fixture = TestBed.createComponent(RecipeFormComponent);
      component = fixture.componentInstance;
      component.oldRecipe = chosenRecipe;
      fixture.detectChanges();
    });
    it((`should fill form with oldRecipe form controls values`), () => {
      expect(component.recipeForm.get('title').value).toEqual(chosenRecipe.title);
      expect(component.recipeForm.get('description').value).toEqual(chosenRecipe.description);
      expect(component.recipeForm.get('photoUrl').value).toEqual(chosenRecipe.photoUrl);
      expect(component.recipeForm.get('instructions').value).toEqual(chosenRecipe.instructions);
      expect(component.recipeForm.get('categoryId').value).toEqual(chosenRecipe.categoryId);
      expect(component.recipeForm.get('ingredients').value).toEqual(chosenRecipe.ingredients);
    });
  });

  describe('addIngredient', () => {
    it((`should add blank FormControl to ingredients`), () => {
      const prevLength = component.ingredients.length;
      component.addIngredient();
      expect(prevLength).not.toEqual(component.ingredients.length);
    });
  });

  describe('removeIngredient', () => {
    it((`should remove FormControl from ingredients`), () => {
      const prevLength = component.ingredients.length;
      component.addIngredient();
      component.removeIngredient(0);
      expect(prevLength).toEqual(component.ingredients.length);
    });
  });

  describe('submitForm', () => {
    it((`should define recipe with all values from recipeForm`), () => {
      const formVal = component.recipeForm.value;
      component.submitForm();
      expect(component.recipe).toEqual(formVal);
    });

    describe('if oldRecipe is undefined', () => {
      it((`should define recipe likes with 0 likes`), () => {
        component.submitForm();
        expect(component.recipe.likes).toEqual(0);
      });
    });

    describe('if oldRecipe is not undefined', () => {
      it((`should define recipe likes with oldRecipe likes`), () => {
        component.oldRecipe = chosenRecipe;
        component.submitForm();
        expect(component.recipe.likes).toEqual(chosenRecipe.likes);
      });
    });

    it((`should reset recipeForm values`), () => {
      const formVal = component.recipeForm.value;
      component.recipeForm.patchValue(chosenRecipe);
      component.submitForm();
      expect(component.recipeForm.value).toEqual(formVal);
    });

    it((`should call onSubmitForm to emit recipe value`), () => {
      let componentRecipe;
      component.recipeForm.patchValue(chosenRecipe);
      const formVal = component.recipeForm.value;
      component.onSubmitForm.subscribe((data) => {
        componentRecipe = data;
      });
      component.submitForm();
      expect(componentRecipe).toEqual(formVal);
    });
  });

});
