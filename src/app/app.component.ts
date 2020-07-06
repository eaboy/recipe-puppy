import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Recipe, SearchParams } from './interfaces/recipe.interfaces';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searching = false;
  recipes: Recipe[];
  thereAreMoreRecipes = true;
  private page = 1;

  searchForm = new FormGroup({
    course: new FormControl(),
    ingredients: new FormControl()
  });

  constructor(private communicationService: CommunicationService) { }

  doSearch(): void {
    this.searching = true;
    this.recipes = [];
    this.page = 1;
    this.requestRecipes();
  }

  private requestRecipes(): void {
    const searchParams: SearchParams = {
      course: this.searchForm.value.course,
      ingredients: this.searchForm.value.ingredients?.split(',').map((ingredient: string) => ingredient.trim()),
      page: this.page,
    };
    this.communicationService.search(searchParams).subscribe((recipes: Recipe[]) => {
      if (recipes.length === 10) {
        this.thereAreMoreRecipes = true;
      } else {
        this.thereAreMoreRecipes = false;
      }
      this.searching = false;
      this.recipes = this.recipes.concat(recipes);
    });
  }

  doLoadMore(): void {
    this.page++;
    this.requestRecipes();
  }

}
