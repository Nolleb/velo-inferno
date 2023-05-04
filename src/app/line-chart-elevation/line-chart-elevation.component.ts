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
  @Input() color!: string
  @Input() data!: any

  chart: any
  labels: string[] = []

  constructor() { }

  ngOnInit(): void {
    this.labels = this.createEmptyArrayLabels(this.data.length / 2)
    this.createChart()
  }

  createChart() {

    this.chart = new Chart("lineElevationID", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.labels,
	       datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: adjustColor(this.color, 20),
            borderColor: this.color,
            borderWidth: 2,
            fill: true,

          }
        ]},

        options: {
          elements: {
            point:{
                radius: 0
            }
          },
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

  createEmptyArrayLabels (size: number) {
      const arr = Array(size).fill("")
      return arr
  }

}
