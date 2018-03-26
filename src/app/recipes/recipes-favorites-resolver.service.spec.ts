import { TestBed, inject } from '@angular/core/testing';

import { RecipesFavoritesResolverService } from './recipes-favorites-resolver.service';

xdescribe('RecipesFavoritesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesFavoritesResolverService]
    });
  });

  it('should be created', inject([RecipesFavoritesResolverService], (service: RecipesFavoritesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
