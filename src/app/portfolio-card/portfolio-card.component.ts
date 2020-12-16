import { Component, OnInit, Input } from '@angular/core';
import { Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';
import { Details } from '../models/details';
import { DetailsService } from '../details.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css']
})
export class PortfolioCardComponent implements OnInit {
  @Input() item: Portfolio;
  stock: Details;
  loaded = false;
  costPerShare: number;
  isNegative: boolean = false;
  change: number = 0;
  changePercent: number = 0;
  marketValue: number = 0;
  isZero: boolean = false;
  isDeleted: boolean = false;

  constructor(private detailsService: DetailsService, private modalService: NgbModal, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    // console.log(this.item);
    this.detailsService.getDetails(this.item.ticker).subscribe(details => {
      this.stock = details;
      this.costPerShare = this.item.totalCost / this.item.quantity;
      this.change = this.stock.last - this.costPerShare;
      if (Number(this.change.toFixed(10)) < 0) {
        // console.log('here1');
        // console.log(this.change);
        this.isNegative = true;
      }
      if (this.change < 0.00000000001) {
        // console.log('here2');
        this.isZero = true;
      }
      this.changePercent = this.change / this.costPerShare;
      // console.log(this.costPerShare);
      this.marketValue = this.item.quantity * this.stock.last;
      this.loaded = true;
    })
  }

  showBuyModal() {
    const ref = this.modalService.open(BuyModalComponent);
    ref.componentInstance.stock = this.stock;
    ref.componentInstance.buy = true;
    ref.result.then((result) => {
      this.updateValues();
    })
  }

  showSellModal() {
    const ref = this.modalService.open(BuyModalComponent);
    ref.componentInstance.stock = this.stock;
    ref.componentInstance.buy = false;
    ref.result.then((result) => {
      this.updateValues();
    })
  }

  updateValues() {
    this.item = this.portfolioService.getOneItem(this.stock.ticker);
    if (this.item === null) {
      this.isDeleted = true;
    } else {
      this.costPerShare = this.item.totalCost / this.item.quantity;
      this.marketValue = this.item.quantity * this.stock.last;
    }
  }
}
