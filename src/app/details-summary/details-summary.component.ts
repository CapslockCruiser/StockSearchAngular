import { Component, Input, OnInit } from '@angular/core';
import { Details } from '../models/details';
import * as Highcharts from 'highcharts/highstock';
import { IntradayService } from '../intraday.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-summary',
  templateUrl: './details-summary.component.html',
  styleUrls: ['./details-summary.component.css']
})
export class DetailsSummaryComponent implements OnInit {
  @Input() details: Details;
  @Input() marketOpen: boolean;
  @Input() isNegative: boolean = true;
  
  Dailycharts: typeof Highcharts = Highcharts;
  intradayData = [];

  getDataCount = 0;
  intervalSet: boolean = false;

  public updateChart: boolean = false;

  chartOptions: Highcharts.Options;
  
  getData(): void {
    if ((!environment.production && this.getDataCount < 3) || environment.production) {
      // console.log(`summary chart updated called this many times + 1: ${this.getDataCount}`);
      this.intrdayService.getIntraday(this.details.ticker).subscribe(results => {
        this.intradayData = results['dailyData'];

        this.chartOptions = {
          chart: {
            reflow: true,
          },
          series: [
            {
              type: 'line',
              data: this.intradayData,
              color: this.isNegative ? 'red' : 'green',
            }
          ],
          title: {
            text: this.details.ticker,
          },
          rangeSelector: {
            enabled: false,
          },
          navigator: {
            series: {
              name: this.details.ticker,
              type: 'area',
              fillColor: this.isNegative ? 'red' : 'green',
              lineWidth: 0,
            }
          },
          time: {
            useUTC: false,
          }
        }

        this.updateChart = true;
        // console.log(this.chartOptions);

        if (!environment.production) {
          this.getDataCount += 1;
          // console.log(`setting dataCount to ${this.getDataCount}`);
        }

        if (this.marketOpen === true && !this.intervalSet) {
            setInterval(this.getData.bind(this), 15000);
            this.intervalSet = true;
        }

      });
    }
  }

  constructor(private intrdayService: IntradayService ) { }

  ngOnInit(): void {
    this.getData();
  }

}
