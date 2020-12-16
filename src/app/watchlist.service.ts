import { Injectable } from '@angular/core';
import { Details } from './models/details';
import { DetailsService } from './details.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private detailsService: DetailsService) { }

  removeFromWatchlist(ticker: string) {
    let watchlistStrings = JSON.parse(localStorage.getItem('watchlist'));

    let newList = watchlistStrings.filter(string => {
      return ticker !== string
    });

    localStorage.setItem("watchlist", JSON.stringify(newList));
  }

    // TODO: Not currently used. Should refactor watchlist component to use this later
  getWatchlist() {
    let watchlistStrings = JSON.parse(localStorage.getItem('watchlist'));
    // console.log(this.watchlistStrings);

    if (watchlistStrings === null || watchlistStrings.length === 0) {

    }

    var watchlistItems: Details[] = [];

    for (var i = 0; i < watchlistStrings.length; i++) {
      let ticker = watchlistStrings[i];
      this.detailsService.getDetails(ticker).subscribe((detail) => {
        watchlistItems.push(detail);
      })
    }

    // return watchlistItems;
  } 
}
