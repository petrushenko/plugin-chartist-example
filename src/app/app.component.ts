import { Component, OnDestroy } from "@angular/core";

import * as Chartist from "chartist";
import { formatDate } from "@angular/common";

import { ChartEvent, ChartType } from "ng-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import ChartistTitle from "chartist-plugin-axistitle";
import { ILineChartOptions } from "chartist";
import { Subscription, timer } from "rxjs";

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  public data = {
    labels: [],
    series: [[]]
  };
  public label = "init";
  public type: ChartType = "Line";
  public options: ILineChartOptions;

  getOptions() {
    console.log(this.label);

    return {
      chartPadding: {
        left: 25,
        bottom: 25
      },
      plugins: [
        ChartistTooltip({
          anchorToPoint: true,
          appendToBody: true
        }),
        ChartistTitle({
          axisX: {
            axisTitle: `LabeL: ${this.label}`,
            offset: {
              x: 0,
              y: 40
            },
            textAnchor: "middle"
          }
        })
      ],
      showPoint: true
    };
  }

  private timerSubscription: Subscription;

  constructor() {
    this.options = this.getOptions();
    this.timerSubscription = timer(0, 2500).subscribe(() => this.updateData());
  }

  updateData() {
    const time: Date = new Date(),
      formattedTime = formatDate(time, "HH:mm:ss", "en"),
      random = getRandomInt(1, 40),
      data = this.data.series[0],
      labels = this.data.labels;

    labels.push(formattedTime);
    data.push(random);

    this.label = random.toString();

    // We only want to display 10 data points at a time
    this.data.labels = labels.slice(-9);
    this.data.series[0] = data.slice(-9);

    this.data = { ...this.data };
    this.options = this.getOptions();
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
