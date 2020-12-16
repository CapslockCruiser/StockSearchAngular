import { Component, OnInit } from '@angular/core';
import { SearchAutocompleteService } from '../search-autocomplete.service';
import { Autocomplete } from '../models/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  list: Autocomplete[];
  selectedStock: Autocomplete;
  isLoading: boolean = false;

  constructor(private saService: SearchAutocompleteService, private router: Router) { 
    // saService.getAutocomplete('args').subscribe(list => console.log(list));
  }

  ngOnInit(): void {
  }

  // use debounce to slow rate of autocomplete
  searchList(e) {
    const ticker = e.target.value;
    if (ticker !== "") {
      this.isLoading = true;
      this.list = [];
      this.saService.getAutocomplete(ticker).subscribe(result => {
        this.list = result;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      this.list = [];
    }
  }

  searchStock() {
    if (this.selectedStock !== undefined) {
      this.router.navigate([`/details/${this.selectedStock.ticker}`]);
    }
  }

  displayFn(item: Autocomplete): string {
    return `${item.ticker}|${item.name}`;
  }

  onSelected(e) {
    this.selectedStock = e;
  }
}
