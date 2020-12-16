import { Component, OnInit, Input } from '@angular/core';
import { Details } from '../models/details';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.css']
})

export class WatchlistCardComponent implements OnInit {
  @Input() item: Details;
  isNegative: boolean = false;
  isZero: boolean = false;
  isHidden: boolean = false;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    if (this.item.change < 0) {
      this.isNegative = true;
    }
    if (this.item.change === 0) {
      this.isZero = true;
    }
  }

  removeFromWatchlist() {
    // console.log(`removing ${this.item.ticker} from watchlist`);
    this.watchlistService.removeFromWatchlist(this.item.ticker);
    this.isHidden = true;
  }
}
