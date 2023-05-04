import {  Component, OnInit} from '@angular/core';
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
  totalRides: any[] = []
  globalStats: any[] = []

  ngOnInit(): void {
    this.isLoading = true
    this.getGlobatStats()
  }

  getGlobatStats() {

      this.stravaService.getActivities().subscribe(it =>{
        this.isLoading = false

        this.years.map((year: string) => {
          let distance = 0
          let elevation = 0
          let time = ''
          this.globalStats = [...it.activities.activities.filter((stats: { date: string }) => parseInt(stats.date) === parseInt(year))]
          distance = Object.values(this.globalStats!).reduce((t, {distance}) => t + distance, 0)
          elevation = Object.values(this.globalStats!).reduce((t, {elevation}) => t + elevation, 0)
          time = Object.values(this.globalStats!).reduce((t, {time}) => t + time, 0)
          this.totalDistance.push(Number((distance / 1000).toFixed(2)))
          this.totalElevation.push(Number((elevation / 1000).toFixed(2)))
          this.totalTime.push(this.secondsToHours(time))
          this.totalRides.push(this.globalStats.length)

          console.log("distance" , this.totalDistance);


        })

      })
  }

  secondsToHours(value: string): number {
      const totalMinutes = Math.floor(parseInt(value) / 60);

      const hours = Math.floor(totalMinutes / 60);

      return hours
  }
}


