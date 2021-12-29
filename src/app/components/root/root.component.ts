import {Component, OnInit} from '@angular/core';
import {Search} from "../../core/models/search.model";

@Component({
  selector: 'root-project',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {

  searchData!: Search;

  onSearchChange(search: Search) {
    this.searchData = search;
  }

}
