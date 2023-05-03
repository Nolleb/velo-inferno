import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { adjustColor } from '../utils/adjust-color';

@Component({
  selector: 'app-bar-chart-distance',
  templateUrl: './bar-chart-distance.component.html',
  styleUrls: ['./bar-chart-distance.component.scss']
})
export class BarChartDistanceComponent implements OnInit {
  @Input() years?: any[]

  @Input() label!: string
  @Input() color!: string
  @Input() data!: any

  public chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart()
  }

  createChart() {

    console.log("bonn distance ", this.data);
    //this.chart.defaults.color = "#1c0c4f"

    this.chart = new Chart("chartDistanceID", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.years,
	       datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: adjustColor(this.color, 20),
            borderColor: this.color,
            borderWidth: 2,
          }
        ]},

        options: {
          responsive: true, // not necessary, default is `true`,
          maintainAspectRatio: false, // default is `true`, default `aspectRatio` is 2
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#1c0c4f',
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

}
