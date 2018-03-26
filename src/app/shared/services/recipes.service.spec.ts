import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpMock: HttpTestingController;
  let recipesListMock;
  let recipeToRemove;
  let chosenRecipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [RecipesService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(RecipesService);
    httpMock = TestBed.get(HttpTestingController);
    recipesListMock = [{
      id: 'testId1',
      title: 'Sicilian Roasted Chicken',
      description: 'Chicken pieces seasoned with paprika, garlic powder, and oregano are roasted until juicy and tender in recipe.',
      photoUrl: 'http://images.media-allrecipes.com/userphotos/560x315/3922864.jpg',
      ingredients: ['1 whole chicken', '1 teaspoon salt', '1 teaspoon ground paprika',
        '1 teaspoon garlic powder', '1 teaspoon dried oregano'],
      instructions: 'Preheat oven to 425 degrees F (220 degrees C).',
      categoryId: '-L4N7j92qDMvS8BbgE5u',
      likes: 1,
      isFavorite: false
    },
      {
        id: 'testId2',
        title: 'Sicilian Roasted Chicken',
        description: 'Chicken pieces seasoned with paprika, garlic powder, and oregano are roasted until juicy and tender in recipe.',
        photoUrl: 'http://images.media-allrecipes.com/userphotos/560x315/3922864.jpg',
        ingredients: ['1 whole chicken', '1 teaspoon salt', '1 teaspoon ground paprika',
          '1 teaspoon garlic powder', '1 teaspoon dried oregano'],
        instructions: 'Preheat oven to 425 degrees F (220 degrees C).',
        categoryId: '-L4N7j92qDMvS8BbgE5u',
        likes: 4,
        isFavorite: false
      }];
    recipeToRemove = recipesListMock[0];
    chosenRecipe = recipesListMock[1];
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRecipes', () => {
    it('should return recipes', () => {
      service.recipes = recipesListMock;
      const recipes = service.getRecipes();

      expect(recipes).toEqual(recipesListMock);
    });
  });

  describe('serveRecipes', () => {
    it('should make get http request', () => {
      service.serveRecipes().subscribe((data) => {
        expect(data).toEqual(recipesListMock);
      });
      const req = httpMock.expectOne(service.recipesUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(recipesListMock);
    });

    it('should assign response data to recipes', () => {
      service.serveRecipes().subscribe();
      const req = httpMock.expectOne(service.recipesUrl);

      req.flush(recipesListMock);
      expect(service.recipes).toEqual(recipesListMock);
    });
  });

  describe('serveFavRecipes', () => {
    it('should make get http request', () => {
      service.serveFavRecipes().subscribe((data) => {
        expect(data).toEqual(recipesListMock);
      });
      const req = httpMock.expectOne(service.recipesFavoritesUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(recipesListMock);
    });

    it('should assign response data to recipes', () => {
      service.serveFavRecipes().subscribe();
      const req = httpMock.expectOne(service.recipesFavoritesUrl);

      req.flush(recipesListMock);
      expect(service.recipes).toEqual(recipesListMock);
    });
  });

  describe('getRecipe', () => {
    it('should return recipe', () => {
      service.chosenRecipe = chosenRecipe;
      const recipe = service.getRecipe();

      expect(recipe).toEqual(service.chosenRecipe);
    });
  });

  describe('serveRecipe', () => {
    it('should make get http request', () => {
      service.serveRecipe(chosenRecipe.id).subscribe((data) => {
        expect(data).toEqual(chosenRecipe);
      });
      const req = httpMock.expectOne(`${service.recipesUrl}/${chosenRecipe.id}`);

      expect(req.request.method).toEqual('GET');
      req.flush(chosenRecipe);
    });

    it('should assign response data to recipes', () => {
      service.serveRecipe(chosenRecipe.id).subscribe();
      const req = httpMock.expectOne(`${service.recipesUrl}/${chosenRecipe.id}`);

      req.flush(chosenRecipe);
      expect(service.chosenRecipe).toEqual(chosenRecipe);
    });
  });

  describe('addRecipe', () => {
    it('should make post http request', () => {
      service.addRecipe(chosenRecipe).subscribe();
      const req = httpMock.expectOne(service.recipesUrl);

      req.flush('');
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('editRecipe', () => {
    it('should make put http request', () => {
      service.editRecipe(chosenRecipe).subscribe();
      const req = httpMock.expectOne(service.recipesUrl);

      req.flush('');
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('deleteRecipe', () => {
    it('should make delete http request', () => {
      service.recipes = recipesListMock;
      service.deleteRecipe(recipeToRemove.id).subscribe();
      const req = httpMock.expectOne(`${service.recipesUrl}/${recipeToRemove.id}`);

      req.flush('');
      expect(req.request.method).toEqual('DELETE');
    });

    it('should remove recipe from local store', () => {
      service.recipes = recipesListMock;
      service.deleteRecipe(recipeToRemove.id).subscribe();
      const req = httpMock.expectOne(`${service.recipesUrl}/${recipeToRemove.id}`);

      req.flush('');
      expect(service.recipes.indexOf(recipeToRemove)).toEqual(-1);
    });

    it('should trigger subscription with updated recipes', () => {
      service.recipes = recipesListMock;
      service.deleteRecipe(recipeToRemove.id).subscribe();
      const req = httpMock.expectOne(`${service.recipesUrl}/${recipeToRemove.id}`);

      const subscription = service.recipesChanged.subscribe((data) => {
        expect(data.indexOf(recipeToRemove)).toEqual(-1);
      });
      req.flush('');
      subscription.unsubscribe();
    });
  });

  describe('updateRate', () => {
    it('should update old recipe with new one', () => {
      service.recipes = recipesListMock;
      const newRecipe = Object.assign(chosenRecipe);
      newRecipe.likes = ++chosenRecipe.likes;
      service.updateRate(newRecipe);

      expect(service.recipes).toContain(newRecipe);
    });

    it(`should not update recipes if there's no such recipe with same id`, () => {
      service.recipes = recipesListMock;
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
      newRecipe.id = 'null';
      service.updateRate(newRecipe);
      expect(service.recipes).not.toContain(newRecipe);
    });
  });

  describe('likeRecipe', () => {
    it('should make post http request', () => {
      service.recipes = recipesListMock;
      service.likeRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesUrl}/likes`);

      req.flush(chosenRecipe);
      expect(req.request.method).toEqual('POST');
    });

    it('should call updateRate method', () => {
      service.recipes = recipesListMock;
      service.likeRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesUrl}/likes`);
      const spy = spyOn(service, 'updateRate');

      req.flush(chosenRecipe);
      expect(spy).toHaveBeenCalledWith(chosenRecipe);
    });

    it('should trigger subscription with updated recipes', () => {
      service.recipes = recipesListMock;
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
      newRecipe.likes = 100;
      service.likeRecipe(newRecipe.id);
      const req = httpMock.expectOne(`${service.recipesUrl}/likes`);

      const subscription = service.recipesChanged.subscribe((data) => {
        expect(data.indexOf(newRecipe)).not.toEqual(-1);
      });
      req.flush(newRecipe);
      subscription.unsubscribe();
    });
  });

  describe('dislikeRecipe', () => {
    it('should make post http request', () => {
      service.recipes = recipesListMock;
      service.dislikeRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesUrl}/dislikes`);

      req.flush(chosenRecipe);
      expect(req.request.method).toEqual('POST');
    });

    it('should call updateRate method', () => {
      service.recipes = recipesListMock;
      service.dislikeRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesUrl}/dislikes`);
      const spy = spyOn(service, 'updateRate');

      req.flush(chosenRecipe);
      expect(spy).toHaveBeenCalledWith(chosenRecipe);
    });

    it('should trigger subscription with updated recipes', () => {
      service.recipes = recipesListMock;
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
      newRecipe.likes = 100;
      service.dislikeRecipe(newRecipe.id);
      const req = httpMock.expectOne(`${service.recipesUrl}/dislikes`);

      const subscription = service.recipesChanged.subscribe((data) => {
        expect(data.indexOf(newRecipe)).not.toEqual(-1);
      });
      req.flush(newRecipe);
      subscription.unsubscribe();
    });
  });

  describe('addFavRecipe', () => {
    beforeEach(() => {
      service.chosenRecipe = chosenRecipe;
      service.chosenRecipe.isFavorite = true;
    });

    it('should make post http request', () => {
      service.addFavRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesFavoritesUrl}`);

      req.flush('');
      expect(req.request.method).toEqual('POST');
    });

    it('should change isFavorite property of chosen recipe', () => {
      service.addFavRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesFavoritesUrl}`);

      req.flush('');
      expect(service.chosenRecipe.isFavorite).toBeTruthy();
    });

    it('should trigger subscription with updated recipes', () => {
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
      newRecipe.isFavorite = true;
      service.addFavRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesFavoritesUrl}`);

      const subscription = service.chosenRecipeChanged.subscribe((data) => {
        expect(data).toEqual(newRecipe);
      });
      req.flush('');
      subscription.unsubscribe();
    });
  });

  describe('deleteFavRecipe', () => {
    beforeEach(() => {
      service.chosenRecipe = chosenRecipe;
      service.chosenRecipe.isFavorite = true;
    });

    it('should make delete http request', () => {
      service.deleteFavRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesFavoritesUrl}/${chosenRecipe.id}`);

      req.flush('');
      expect(req.request.method).toEqual('DELETE');
    });

    it('should change isFavorite property of chosen recipe', () => {
      service.deleteFavRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesFavoritesUrl}/${chosenRecipe.id}`);

      req.flush('');
      expect(service.chosenRecipe.isFavorite).toBeFalsy();
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
      newRecipe.isFavorite = false;
      service.deleteFavRecipe(chosenRecipe.id);
      const req = httpMock.expectOne(`${service.recipesFavoritesUrl}/${chosenRecipe.id}`);

      const subscription = service.chosenRecipeChanged.subscribe((data) => {
        expect(data).toEqual(newRecipe);
      });
      req.flush('');
      subscription.unsubscribe();
    });
  });
});
