import { Component, OnInit } from '@angular/core';
import { Details } from '../models/details';
import { Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  loaded: boolean = false;
  portfolioEmpty: boolean = true;
  items: Portfolio[] = [];
  stocks: Details[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.items = this.portfolioService.getPortfolio();

    if (this.items.length !== 0) {
      this.portfolioEmpty = false;
    }

    this.items.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1);
    this.loaded = true;
  }

}
