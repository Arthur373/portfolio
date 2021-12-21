import {Component} from '@angular/core';
import {Search} from "./core/models/search.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchData!:Search;

  getSearchFilterData(search: Search){
    this.searchData = search;
  }
}
