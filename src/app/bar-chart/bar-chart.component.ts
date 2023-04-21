import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() years?: any[]
  @Input() dataDistance!: any[]
  @Input() dataElevation!: any[]
  @Input() dataTime!: any[]

  public chart: any;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.years);
    //console.log(this.dataChart);

    this.createChart()
    //console.log("id chart created ", this.id);

  }

  createChart() {

    this.chart = new Chart("myChart", {
      type: 'bar', //this denotes tha type of chart


      data: {// values on X-Axis
        labels: this.years,
	       datasets: [
          {
            label: "Distance",
            data: this.dataDistance,
            backgroundColor: 'blue'
          },
          {
            label: "Dénivelé",
            data: this.dataElevation,
            backgroundColor: 'limegreen'
          },
          {
            label: "Temps passé",
            data: this.dataTime,
            backgroundColor: 'pink'
          },
          {
            label: "Nombre de sorties",
            data: this.dataTime,
            backgroundColor: '#1ce'
          }
        ]},

      options: {
        aspectRatio:2.5
      }

    });
  }

}
