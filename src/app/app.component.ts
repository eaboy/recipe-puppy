import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchForm = new FormGroup({
    course: new FormControl(),
    ingredients: new FormControl()
  });

  doSearch(): void { }

}
