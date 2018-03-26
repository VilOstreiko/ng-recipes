import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriesService {
  categoriesUrl = '/categories';

  constructor(private http: HttpClient) {
  }

  serveCategories() {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getCategoryName(id: string): Observable<string> {
    return this.serveCategories()
      .map(categories => {
        const categoryChosen = categories.find((item) => item['id'] === id);
        return categoryChosen ? categoryChosen.name : 'none';
      });
  }
}
