import { Component, OnInit } from '@angular/core';
import { Details } from '../models/details';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
  stock: Details;
  total: number = 0;
  quantity: number = 0;
  buy: boolean = true;

  constructor(private activeModalService: NgbActiveModal, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
  }

  closeSelf() {
    this.activeModalService.close();
  }

  buyStock() {
    if (this.quantity > 0) {
      this.portfolioService.buyStock(this.stock.ticker, this.quantity, this.stock.last);
      this.closeSelf();
    }

    // this.portfolioService.clearPortfolio();
  }

  sellStock() {
    var item = this.portfolioService.getOneItem(this.stock.ticker);
    if (item !== null) {
      if (this.quantity <= item.quantity) {
        this.portfolioService.sellStock(this.stock.ticker, this.quantity);
        this.closeSelf();
      }
    } else {
      console.log('You do not own any of the stock you are trying to sell.');
    }
  }

  updateTotal(value) {
    this.quantity = value;
    if (this.quantity >= 0) {
      const newPrice = this.quantity * this.stock.last;
      // console.log(newPrice);
      this.total = newPrice;
    }
  }

}
