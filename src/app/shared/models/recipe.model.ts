export class Recipe {
  title: string;
  description: string;
  photoUrl: string;
  ingredients: Array<string>;
  instructions: string;
  id: string;
  categoryId: string;
  likes: number;
  isFavorite: boolean;
}
