import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountriesService} from "./services/countries.service";
import {PortfolioService} from "./services/portfolio.service";
import {UsersService} from "./services/users.service";
import {WorkflowStatesService} from "./services/workflowStates.service";
import {PortfolioSortService} from "./services/portfolio-change/portfolio-sort.service";
import {PortfolioFilterService} from "./services/portfolio-change/portfolio-filter.service";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ],
  providers: [
    PortfolioService,
    CountriesService,
    UsersService,
    WorkflowStatesService,
    PortfolioSortService,
    PortfolioFilterService
  ],
})
export class CoreModule { }
