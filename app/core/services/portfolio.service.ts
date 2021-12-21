import {Injectable} from '@angular/core';

import {Portfolio} from "../models/portfolio.model";
import {Search} from "../models/search.model";
import {CountriesService} from "./countries.service";
import {WorkflowStatesService} from "./workflowStates.service";
import {UsersService} from "./users.service";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {zip} from "rxjs";
import {PortfolioSortService} from "./portfolio-change/portfolio-sort.service";
import {PortfolioFilterService} from "./portfolio-change/portfolio-filter.service";


@Injectable()
export class PortfolioService {

  constructor(private countriesService: CountriesService,
              private workflowStatesService: WorkflowStatesService,
              private usersService: UsersService,
              private portfolioSortService: PortfolioSortService,
              private portfolioFilterService: PortfolioFilterService,
              private http: HttpClient) {
  }

  private getResponsesMapData() {
    return this.http.get<Portfolio[]>("/assets/Response.json").pipe(map(responseData => responseData["data"]));
  }


  public getResponses(currentPage: number, pageNumber: number) {
    return this.getResponsesMapData().pipe(
      map(portfolios => {
        let filteredDataLength: number = portfolios.length;
        let filteredData: Portfolio[] = PortfolioService.getPaginationData(portfolios, currentPage, pageNumber);
        return {filteredData, filteredDataLength};
      })
    );
  }

  public getResponsesByFilter(currentPage: number, pageNumber: number, searchData: Search, statusId: number, sortingOption: { fieldName: string, sortType: number }) {
    const portfolios$ = this.getResponsesMapData();
    const countries$ = this.countriesService.findCountries();
    const users$ = this.usersService.findUsers();
    const statuses$ = this.workflowStatesService.findAllWorkflowStates();

    return zip(portfolios$, countries$, users$, statuses$).pipe(
      map(([portfolios, countries, users, statuses]) => {
        let filteredData: Portfolio[] = this.portfolioFilterService.filterData(portfolios, searchData, statusId);
        let filteredDataLength: number = filteredData.length;

        this.portfolioSortService.sortData(filteredData, countries, users, statuses, sortingOption.fieldName, sortingOption.sortType);
        filteredData = PortfolioService.getPaginationData(filteredData, currentPage, pageNumber);
        return {filteredData, filteredDataLength};
      })
    )
  }


  private static getPaginationData(filterData: Portfolio[], activePage: number, recordsPerPage: number): Portfolio[] {
    let startIndex = activePage <= 1 ? 0 : (activePage - 1) * recordsPerPage;
    return filterData.slice(startIndex, startIndex + recordsPerPage);
  }
}
