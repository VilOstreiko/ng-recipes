import { RecipesListComponent } from './recipes-list.component';
import { RecipesService } from '../../shared/services/recipes.service';

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let service: RecipesService;
  const recipesList = [{
    id: 'testId',
    title: 'Sicilian Roasted Chicken',
    description: 'Chicken pieces seasoned with paprika, garlic powder, and oregano are roasted until juicy and tender in this simple Sicilian-inspired recipe.',
    photoUrl: 'http://images.media-allrecipes.com/userphotos/560x315/3922864.jpg',
    ingredients: ['1 whole chicken', '1 teaspoon salt', '1 teaspoon ground black pepper', '1 teaspoon ground paprika', '1 teaspoon garlic powder', '1 teaspoon dried oregano'],
    instructions: 'Preheat oven to 425 degrees F (220 degrees C). Grease a 9x13-inch pan with cooking spray. Arrange chicken pieces in the baking pan. Sprinkle salt, pepper, paprika, garlic powder, and oregano over both sides. Roast in the preheated oven until chicken is browned and the juices run clear, about 1 hour. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C).',
    categoryId: '-L4N7j92qDMvS8BbgE5u',
    likes: 0,
    isFavorite: false
  },
    {
      id: 'testId',
      title: 'Tequila-Lime Pork Tenderloin',
      description: 'A wonderful overnight marinade gives your pork tenderloin a wonderful lime-grilled flavor. You can also grill one tenderloin and freeze the other for future use.',
      photoUrl: 'http://images.media-allrecipes.com/userphotos/250x250/880924.jpg',
      ingredients: ['1 cup fresh lime juice', '1/2 cup tequila', '1/2 cup orange juice', '1/4 cup chopped fresh cilantro', '2 tablespoons chopped green chiles', '1 1/2 tablespoons chili powder', '1 teaspoon minced garlic', '1 tablespoon honey', '1 teaspoon salt', '3/4 teaspoon ground black pepper', '2 pork tenderloins'],
      instructions: 'Whisk together the lime juice, tequila, orange juice, cilantro, chiles, chili powder, garlic, honey, salt, and pepper in a large bowl; pour into a gallon-sized resealable bag; add the pork tenderloins; seal and store in refrigerator overnight. Preheat an outdoor grill for high heat and lightly oil grate. Cook the pork on the preheated grill, turning occasionally, until meat has reached an internal temperature of 145 degrees F (63 degrees C), about 20 minutes.',
      categoryId: '-L4N7j92qDMvS8BbgE5u',
      likes: 0,
      isFavorite: false
    }];

  beforeEach(() => {
    service = new RecipesService(null);
    component = new RecipesListComponent(service);
    service.recipes = recipesList;
  });

  describe('OnInit', () => {
    it(('should set recipes in recipes variable'), () => {
      component.ngOnInit();

      expect(component.recipes).toEqual(service.recipes);
    });

    it(('should change recipes if service recipes are updated'), () => {
      component.ngOnInit();
      service.recipes.push(recipesList[0]);
      service.recipesChanged.next([...service.recipes]);

      expect(component.recipes).toEqual(service.recipes);
    });

    it(('should recipes list subscription subscribe'), () => {
      component.ngOnInit();

      expect(component.recipesListSubscription.closed).toBeFalsy();
    });
  });

  describe('OnDestroy', () => {
    it(('should recipes list subscription unsubscribe'), () => {
      component.ngOnInit();
      component.ngOnDestroy();

      expect(component.recipesListSubscription.closed).toBeTruthy();
    });
  });

});
