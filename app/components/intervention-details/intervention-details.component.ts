import { Component, OnInit } from '@angular/core';
import {Portfolio} from "../../core/models/portfolio.model";
import {ActivatedRoute} from "@angular/router";
import {PortfolioService} from "../../core/services/portfolio.service";

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.css']
})
export class InterventionDetailsComponent implements OnInit {

  portfolio:Portfolio;
  responseId:number;

  constructor(private route: ActivatedRoute,private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    this.responseId = +routeParam.get("interventionID");
    this.portfolioService.getResponseById(this.responseId).subscribe(portfolio => this.portfolio = portfolio);
  }

}
