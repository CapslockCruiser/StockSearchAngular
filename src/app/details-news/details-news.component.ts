import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { News } from '../models/news';

@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {
  @Input() newsItems: News[];
  @Input() ticker: string;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews(this.ticker).subscribe(results => {
      this.newsItems = results;
    })
  }

}
