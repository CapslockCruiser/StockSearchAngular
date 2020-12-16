import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './details/details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';
import { DetailsSummaryComponent } from './details-summary/details-summary.component';
import { DetailsNewsComponent } from './details-news/details-news.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { DetailsChartComponent } from './details-chart/details-chart.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchlistCardComponent } from './watchlist-card/watchlist-card.component';
import { NewsModalComponent } from './news-modal/news-modal.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    DetailsComponent,
    DetailsSummaryComponent,
    DetailsNewsComponent,
    NewsCardComponent,
    DetailsChartComponent,
    WatchlistComponent,
    WatchlistCardComponent,
    NewsModalComponent,
    PortfolioComponent,
    BuyModalComponent,
    PortfolioCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
