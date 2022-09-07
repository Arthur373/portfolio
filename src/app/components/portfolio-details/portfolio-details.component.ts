import {Component, OnInit} from '@angular/core';
import {Portfolio} from "../../core/models/portfolio.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PortfolioService} from "../../core/services/portfolio.service";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  // private responseInstanceId: number;
  portfolio: Portfolio;
  portfolio$: Observable<Portfolio>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    // const routeParam = this.route.snapshot.paramMap;
    // this.responseInstanceId = +routeParam.get("portfolioInstanceID");
    // this.portfolioService.getResponse(this.responseInstanceId).subscribe(portfolio => this.portfolio = portfolio);


    this.portfolio$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.portfolioService.getResponse(+params.get('portfolioInstanceID')))
    );
  }

}
