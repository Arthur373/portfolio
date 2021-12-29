import {Pipe, PipeTransform} from '@angular/core';
import {CountriesService} from "../../core/services/countries.service";
import {Portfolio} from "../../core/models/portfolio.model";
import {Observable} from "rxjs";

// TODO: rename
@Pipe({
  name: 'countryName'
})
export class CountryPipe implements PipeTransform {

  constructor(private countriesService: CountriesService) {
  }

  transform(portfolio: Portfolio): Observable<string> {
    return this.countriesService.getCountryNameById(portfolio?.InterventionCountryID);
  }
}
