import { Injectable } from '@angular/core';
import { Portfolio } from './models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  sellStock(ticker: string, quantity: number): void {
    var portfolio = this.getPortfolio();

    for (var i = 0; i < portfolio.length; i++) {
      if (portfolio[i].ticker === ticker) {
        let avgPrice = portfolio[i].totalCost / portfolio[i].quantity;
        portfolio[i].quantity = portfolio[i].quantity - quantity;
        portfolio[i].totalCost = portfolio[i].totalCost - quantity * avgPrice;
      }
    }

    portfolio = portfolio.filter((item) => {
      return !(item.quantity === 0);
    });

    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  buyStock(ticker: string, quantity: number, price: number): void {
    var portfolios: Portfolio[] = JSON.parse(localStorage.getItem('portfolio'));

    // console.log(portfolios);

    const quantityNumber = Number(quantity);
    const priceNumber = Number(price);

    if (portfolios === null) {
      portfolios = [];
    }

    var found = false;

    for (var i = 0; i < portfolios.length; i++) {
      if (portfolios[i].ticker === ticker) {
        portfolios[i].totalCost = quantityNumber * priceNumber + Number(portfolios[i].totalCost);
        portfolios[i].quantity = quantityNumber + Number(portfolios[i].quantity);
        // console.log(portfolios[i]);
        found = true;
      }
    }

    if (!found) {
      const item: Portfolio = { ticker: ticker, quantity: Number(quantity), totalCost: Number(quantity * price) };
      portfolios.push(item);
    }

    localStorage.setItem('portfolio', JSON.stringify(portfolios));
    // console.log(JSON.parse(localStorage.getItem('portfolio')));
  }

  getPortfolio(): Portfolio[] {
    let portfolios: Portfolio[] = JSON.parse(localStorage.getItem('portfolio'));

    if (portfolios === null || portfolios.length === 0) {
      return [];
    }

    // console.log(portfolios);
    return portfolios;
  }

  getOneItem(ticker: string): Portfolio {
    let portfolios: Portfolio[] = JSON.parse(localStorage.getItem('portfolio'));

    for (var i = 0; i < portfolios.length; i++) {
      if (portfolios[i].ticker === ticker) {
        return portfolios[i];
      }
    }

    return null;
  }

  clearPortfolio() {
    localStorage.removeItem('portfolio');
  }
}
