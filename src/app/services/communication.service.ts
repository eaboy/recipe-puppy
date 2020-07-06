import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchParams, ApiResponse, OriginalRecipe } from '../interfaces/recipe.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private readonly urlEndpoint = '/api/';

  constructor(private http: HttpClient) { }

  search(searchParams: SearchParams): Observable<any> {
    let params = new HttpParams().set('p', searchParams.page.toString());
    if (searchParams.course) {
      params = params.append('q', searchParams.course);
    }
    if (searchParams.ingredients) {
      const ingredients: string = searchParams.ingredients.join(',');
      params = params.append('i', ingredients);
    }
    return this.http.get(this.urlEndpoint, { params }).pipe(
      map((response: ApiResponse) => response.results
        .map((recipe: OriginalRecipe) => {
          return { ...recipe, ingredients: recipe.ingredients.split(', ') };
        })));
  }

}
