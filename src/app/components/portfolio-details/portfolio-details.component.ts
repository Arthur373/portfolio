import {Component, OnInit} from '@angular/core';
import {Portfolio} from "../../core/models/portfolio.model";
import {ActivatedRoute} from "@angular/router";
import {PortfolioService} from "../../core/services/portfolio.service";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  private responseInstanceId: number;
  portfolio: Portfolio;

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    this.responseInstanceId = +routeParam.get("portfolioInstanceID");
    this.portfolioService.getResponse(this.responseInstanceId).subscribe(portfolio => this.portfolio = portfolio);
  }

}
