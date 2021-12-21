import {Injectable} from '@angular/core';
import {CountryModel} from "../models/Country.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";


@Injectable()
export class CountriesService {

  countries!: CountryModel[];

  constructor(private http: HttpClient) {
  }

  findCountries() : Observable<CountryModel[]>{
    if (this.countries) {
      return of(this.countries);
    } else {
      return this.http.get<CountryModel[]>("/assets/Countries.json").pipe(
        map(responseData => {
          this.countries = responseData["data"];
          return this.countries;
        }),
      )
    }
  }

  findCountryNameById(id: number): Observable<string> {
    return this.findCountries().pipe(
      map(countries => {
        return <string>countries.find(country => country.CountryId === id)?.name[3]
      })
    )
  }
}
