import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Details } from '../models/details';
import { HistoryService } from '../history.service';

import {Options} from "highcharts/highstock";

import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";
import IndicatorVBP from "highcharts/indicators/volume-by-price";

IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);
IndicatorVBP(Highcharts);

// https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/stock/demo/sma-volume-by-price

@Component({
  selector: 'app-details-chart',
  templateUrl: './details-chart.component.html',
  styleUrls: ['./details-chart.component.css']
})
export class DetailsChartComponent implements OnInit {
  @Input() details: Details;
  chartLoaded: boolean = false;

  Highcharts: typeof Highcharts = Highcharts;

  public updateHistoryChart: boolean = false;

  chartOptions: Highcharts.Options;

  ohlc = [];
  volume = [];

  constructor(private historyService: HistoryService) { }

  ngOnChanges(): void {
    this.historyService.getHistory(this.details.ticker).subscribe(data => {
      var dataLength = data.length, i = 0;
      // var groupingUnits: Highcharts.PlotOptions.groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];

  
      for (i; i < dataLength; i += 1) {
        let utcDate = Date.parse(data[i]['date']);
        this.ohlc.push([
            utcDate, // the date
            data[i]['open'], // open
            data[i]['high'], // high
            data[i]['low'], // low
            data[i]['close'] // close
        ]);

        this.volume.push([
            utcDate, // the date
            data[i]['volume'] // the volume
        ]);
      }
  
      this.chartOptions = {
        time: {
          useUTC: false,
        },
        rangeSelector: {
          selected: 2
        },
  
        title: {
          text: `${this.details.ticker} Historical`
        },
  
        subtitle: {
          text: 'With SMA and Volume by Price technical indicators'
        },
        series: [{
          type: 'candlestick',
          name: `${this.details.ticker}`,
          id: `${this.details.ticker}`,
          zIndex: 2,
          data: this.ohlc
        }, {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.volume,
          yAxis: 1
        }, {
          type: 'vbp',
          linkedTo: `${this.details.ticker}`,
          params: {
            volumeSeriesID: 'volume'
          },
          dataLabels: {
            enabled: false
          },
          zoneLines: {
            enabled: false
          }
        }, {
          type: 'sma',
          linkedTo: `${this.details.ticker}`,
          zIndex: 1,
          marker: {
            enabled: false
          }
        }],
        // plotOptions: {
        //   series: {
        //       dataGrouping: {
        //           units: groupingUnits
        //       }
        //   }
        // },
        yAxis: [{
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        tooltip: {
          split: true
        },
        }
    })
    this.chartLoaded = true;
  }

  ngOnInit(): void {
 
  }
}