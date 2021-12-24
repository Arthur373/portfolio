import {Injectable} from '@angular/core';
import {CountryModel} from "../models/Country.model";
import {map, shareReplay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class CountriesService {

  private countries$!: Observable<CountryModel[]>;

  constructor(private http: HttpClient) {
    this.countries$ = this.http.get<CountryModel[]>("/assets/Countries.json").pipe(
      map(responseData => responseData["data"]),
      shareReplay({bufferSize: 1, refCount: true}),
    )
  }

  findCountries(): Observable<CountryModel[]> {
    return this.countries$;
  }

  findCountryNameById(id: number): Observable<string> {
    return this.countries$.pipe(map(countries => <string>countries.find(country => country.CountryId === id)?.name[3]));
  }
}
