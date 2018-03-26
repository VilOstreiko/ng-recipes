import { TestBed, inject } from '@angular/core/testing';

import { RecipeResolverService } from './recipe-resolver.service';

xdescribe('RecipeResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeResolverService]
    });
  });

  it('should be created', inject([RecipeResolverService], (service: RecipeResolverService) => {
    expect(service).toBeTruthy();
  }));
});
