import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { DetailsService } from '../details.service';
import { NewsService } from '../news.service';
import { Details } from '../models/details'
import { News } from '../models/news';
import * as moment from 'moment-timezone';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environments/environment';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';

// Highcharts
// https://www.npmjs.com/package/highcharts-angular

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  ticker: string;
  stockDetails: Details;
  loaded: boolean = false;
  isNegative: boolean = false;
  isZero: boolean = false;
  marketOpen: boolean = false;
  invalidSymbol: boolean = false;
  currentTime: moment.Moment;
  getDataCount = 0;
  intervalSet: boolean = false;
  onWatchlist: boolean = false;

  addAlertVisible: boolean = false;
  removeAlertVisible: boolean = false;

  constructor(private route: ActivatedRoute, private detailsService: DetailsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker');

    setInterval(() => {
      this.currentTime = moment().tz('America/Los_Angeles');
    }, 1000);

    this.getSummary();

    let watchlist = JSON.parse(localStorage.getItem('watchlist'));

    // console.log(watchlist);
    if (watchlist !== null) {
      for (var i = 0; i < watchlist.length; i++) {
          if (watchlist[i] === this.ticker) {
            this.onWatchlist = true;
          }
      }
    }
  }

  getSummary(): void {
    if ((!environment.production && this.getDataCount < 3) || environment.production) {
      this.detailsService.getDetails(this.ticker).subscribe(results => {
        this.loaded = true;
        if (results['data'] === "Invalid symbol") {
          this.invalidSymbol = true;
        }
        this.stockDetails = results;
        if (this.stockDetails.change < 0) {
          this.isNegative = true;
        }

        if (this.stockDetails.change === 0) {
          this.isZero = true;
        }

        const timeDiff = (new Date().getTime() - Date.parse(this.stockDetails.timestamp))/1000;
        // console.log(this.stockDetails);

        if (timeDiff < 60) {
          this.marketOpen = true;
        }

        if (!environment.production) {
          this.getDataCount += 1;
          // console.log(`setting dataCount to ${this.getDataCount}`);
        }

        if (this.marketOpen === true && !this.intervalSet) {
            setInterval(this.getSummary.bind(this), 15000);
            this.intervalSet = true;
        }
      });
    }
  }

  addToWatchlist() {
    this.onWatchlist = true;
    var watchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (watchlist === null) {
      let newItem = [this.ticker]
      watchlist = newItem;
    } else {
      watchlist.push(this.ticker);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    this.addAlertVisible = true;

    setTimeout(() => {
      this.addAlertVisible = false;
    }, 5000);
  }

  // TODO: Refactor this to use WatchlistService later
  removeFromWatchlist() {
    this.onWatchlist = false;
    var watchlist = JSON.parse(localStorage.getItem('watchlist'));
    var newWatchlist = watchlist.filter((value, index, arr) => {
      return value !== this.ticker;
    })

    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));

    this.removeAlertVisible = true;

    setTimeout(() => {
      this.removeAlertVisible = false;
    }, 5000);
  }

  closeAddAlert() {
    this.addAlertVisible = false;
  }

  closeRemoveAlert() {
    this.removeAlertVisible = false;
  }

  showBuyModal() {
    const ref = this.modalService.open(BuyModalComponent);
    ref.componentInstance.stock = this.stockDetails;
  }

}