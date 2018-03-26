import { TestBed, inject } from '@angular/core/testing';

import { RecipesListResolverService } from './recipes-list-resolver.service';

xdescribe('RecipesListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesListResolverService]
    });
  });

  it('should be created', inject([RecipesListResolverService], (service: RecipesListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
