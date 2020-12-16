import { Component, Input, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsModalComponent } from '../news-modal/news-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() news: News;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // console.log(this.news);
  }
  
  onClicked(): void {
    const ref = this.modalService.open(NewsModalComponent);
    ref.componentInstance.news = this.news;
  }

}
