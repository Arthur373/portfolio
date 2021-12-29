import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountriesService} from "../../core/services/countries.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Search} from "../../core/models/search.model";
import {CountryModel} from "../../core/models/Country.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchChange = new EventEmitter<Search>();
  form!: FormGroup;
  countries!: CountryModel[];

  constructor(private countriesService: CountriesService) {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      "countryId": new FormControl(0, []),
      "keyword": new FormControl("", [Validators.minLength(3)]),
      "code": new FormControl("", []),
      "title": new FormControl("", []),
      "shortName": new FormControl("", []),
      "description": new FormControl("", []),
      "fromDate": new FormControl("", []),
      "toDate": new FormControl("", []),
    })
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => this.countries = countries);
  }

  onSearch() {
    const search = {
      countryId: +this.form.controls["countryId"].value,
      keyword: this.form.controls["keyword"].value,
      code: this.form.controls["code"].value,
      title: this.form.controls["title"].value,
      shortName: this.form.controls["shortName"].value,
      description: this.form.controls["description"].value,
      fromDate: this.form.controls["fromDate"].value,
      toDate: this.form.controls["toDate"].value,
    }
    if (this.form.valid) {
      this.searchChange.emit(search);
    }
  }

  reset() {
    this.searchChange.emit(null);
  }
}
