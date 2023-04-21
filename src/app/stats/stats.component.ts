import { Component, OnInit } from '@angular/core';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private stravaService: StravaService) { }

  isLoading: boolean = false
  years: string[] = ['2019', '2020', '2021', '2022', '2023']
  totalDistance: any[] = []
  totalTime: any[] = []
  totalElevation: any[] = []
  globalStats: any[] = []

  ngOnInit(): void {

    this.getGlobatStats()
  }


  getGlobatStats() {

    this.years.map((year: string) => {
      this.stravaService.getActivities().subscribe(it =>{
        this.isLoading = false
        this.globalStats.push(...it.activities.filter((stats: { date: string }) => parseInt(stats.date) === parseInt(year)))
        this.totalDistance.push(Object.values(this.globalStats!).reduce((t, {distance}) => t + distance, 0))
        this.totalElevation.push((Object.values(this.globalStats!).reduce((t, {elevation}) => t + elevation, 0)).toFixed(2))
        this.totalTime.push(Object.values(this.globalStats!).reduce((t, {time}) => t + time, 0))

        console.log("totlal distance: " + this.totalDistance);
        console.log("totlal elevation: " + this.totalElevation);
        console.log("totlal time " + this.totalTime);

      })
    })
  }
}
