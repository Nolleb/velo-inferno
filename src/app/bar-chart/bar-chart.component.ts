import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() years?: string[]
  @Input() dataChartKm!: any[]
  public chart: any;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.years);
    console.log(this.dataChartKm);

    this.createChart()
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
          labels: this.years,
	        datasets: this.dataChartKm
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

}
