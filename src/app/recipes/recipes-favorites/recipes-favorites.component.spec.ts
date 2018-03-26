import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesFavoritesComponent } from './recipes-favorites.component';

xdescribe('RecipesFavoritesComponent', () => {
  let component: RecipesFavoritesComponent;
  let fixture: ComponentFixture<RecipesFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
