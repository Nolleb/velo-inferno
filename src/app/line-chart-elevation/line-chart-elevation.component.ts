import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { adjustColor } from '../utils/adjust-color';

@Component({
  selector: 'app-line-chart-elevation',
  templateUrl: './line-chart-elevation.component.html',
  styleUrls: ['./line-chart-elevation.component.scss']
})
export class LineChartElevationComponent implements OnInit {

  @Input() label!: string
  @Input() distanceLabels!: any[]
  @Input() color!: string
  @Input() data!: any

  chart: any
  labels: string[] = []

  constructor() { }

  ngOnInit(): void {
    this.createChart()
  }

  createChart() {

    this.chart = new Chart("lineElevationID", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.distanceLabels,
	       datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: adjustColor(this.color, 70),
            borderColor: this.color,
            borderWidth: 4,
            borderRadius:4,
            barPercentage: 0.5,
            barThickness: 20,
            maxBarThickness: 25,
            minBarLength: 2,
          }
        ]},

        options: {
          indexAxis: 'y',
          responsive: true, // not necessary, default is `true`,
          maintainAspectRatio: false, // default is `true`, default `aspectRatio` is 2
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#fefefe',
              }
            },
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              }
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }

    });
  }

}


