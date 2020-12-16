import { Component, OnInit } from '@angular/core';
import { Details } from '../models/details';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlistEmpty: boolean = true;
  watchlistItems: Details[] = [];
  watchlistStrings: string[] = [];
  loaded: boolean = false;

  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.getWatchlist();
  }

  ngOnChanges(): void {
    this.getWatchlist();
  }

  getWatchlist() {
    this.watchlistStrings = JSON.parse(localStorage.getItem('watchlist'));
    // console.log(this.watchlistStrings);

    if (this.watchlistStrings !== null && this.watchlistStrings.length !== 0) {
      this.watchlistEmpty = false;
      this.updateDetails();
    } else {
      this.watchlistEmpty = true;
      this.loaded = true;
    }
  }

  updateDetails() {
    this.watchlistItems = [];
    for (var i = 0; i < this.watchlistStrings.length; i++) {
      let ticker = this.watchlistStrings[i];
      this.detailsService.getDetails(ticker).subscribe((detail) => {
        this.watchlistItems.push(detail);
        this.loaded = true;
        // TODO: Def refactor this to use Promise.all
        this.watchlistItems.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
      })
    }
  }

}
