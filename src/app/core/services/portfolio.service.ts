import {Injectable} from '@angular/core';

import {Portfolio} from "../models/portfolio.model";
import {Search} from "../models/search.model";
import {CountriesService} from "./countries.service";
import {WorkflowStatesService} from "./workflowStates.service";
import {UsersService} from "./users.service";
import {HttpClient} from "@angular/common/http";
import {map, share} from 'rxjs/operators';
import {Observable, zip} from "rxjs";
import {PortfolioSortService} from "./portfolio-change/portfolio-sort.service";
import {PortfolioFilterService} from "./portfolio-change/portfolio-filter.service";
import {SortingOptionModel} from "../models/sortingOption.model";
import {ResponsesReturnModel} from "../models/responsesReturn.model";


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
    return this.http.get<Portfolio[]>("/assets/Response.json").pipe(map(responseData => responseData["data"]), share());
  }

  // TODO: Don't use any
  public getResponses(currentPage: number, pageNumber: number): Observable<ResponsesReturnModel> {
    return this.getResponsesMapData().pipe(
      map(portfolios => {
        const filteredDataLength: number = portfolios.length;
        const filteredData: Portfolio[] = PortfolioService.getPaginationData(portfolios, currentPage, pageNumber);

        return {filteredData, filteredDataLength};
      })
    );
  }

  // TODO: Don't use any
  // TODO: create model for sortOption
  public getResponsesByFilter(currentPage: number, pageNumber: number, searchData: Search, statusId: number, sortingOption: SortingOptionModel): Observable<ResponsesReturnModel> {
    const portfolios$ = this.getResponsesMapData();
    const countries$ = this.countriesService.getCountries();
    const users$ = this.usersService.getUsers();
    const statuses$ = this.workflowStatesService.getAllWorkflowStates();

    return zip(portfolios$, countries$, users$, statuses$).pipe(
      map(([portfolios, countries, users, statuses]) => {
        let filteredData: Portfolio[] = this.portfolioFilterService.filterData(portfolios, searchData, statusId);
        const filteredDataLength: number = filteredData.length;

        this.portfolioSortService.sortData(filteredData, countries, users, statuses, sortingOption.fieldName, sortingOption.sortType);
        filteredData = PortfolioService.getPaginationData(filteredData, currentPage, pageNumber);

        return {filteredData, filteredDataLength};
      })
    )
  }

  public getResponse(instanceId: number): Observable<Portfolio> {
    return this.getResponsesMapData().pipe(
      map(portfolios => {
        return portfolios?.find(portfolio => portfolio?.InterventionInstanceId === instanceId);
      })
    )
  }

  private static getPaginationData(filterData: Portfolio[], activePage: number, recordsPerPage: number): Portfolio[] {
    const startIndex = activePage <= 1 ? 0 : (activePage - 1) * recordsPerPage;
    return filterData.slice(startIndex, startIndex + recordsPerPage);
  }
}
