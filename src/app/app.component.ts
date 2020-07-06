import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Recipe, SearchParams } from './interfaces/recipe.interfaces';
import { CommunicationService } from './services/communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  searching = false;
  recipes: Recipe[];
  thereAreMoreRecipes = true;
  private page = 1;
  private queryParamsSubscription: Subscription;
  private searchSubject = new Subject();

  searchForm = new FormGroup({
    course: new FormControl(),
    ingredients: new FormControl()
  });

  constructor(
    private communicationService: CommunicationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.pipe(skip(1)).subscribe((params) => {
      if (params.course || params.ingredients || params.page !== 1) {
        const page = Number.parseInt(params.page, 10);
        this.searchForm.controls.course.setValue(params.course);
        this.searchForm.controls.ingredients.setValue(params.ingredients?.join(', '));
        this.searchSubject.pipe(take(page - 1)).subscribe(() => {
          this.doLoadMore();
        });
        this.doSearch();
      }
    });
  }

  doSearch(): void {
    this.queryParamsSubscription.unsubscribe();
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
    if (searchParams.course || searchParams.ingredients || searchParams.page !== 1) {
      this.router.navigate([], { queryParams: searchParams });
    }
  }

  doLoadMore(): void {
    this.page++;
    this.requestRecipes();
  }

}
