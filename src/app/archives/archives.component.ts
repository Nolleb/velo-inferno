import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  isLoading: boolean = false
  year: string = ''
  totalDistance: number = 0
  totalElevation: number = 0
  totalTime: number = 0
  globalStats: any[] = []

  constructor(private stravaService: StravaService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("year")) {
        this.year = paramMap.get("year") || ''
        this.isLoading = true
        this.reset()

        this.stravaService.getActivities().subscribe(it =>{
          this.isLoading = false
          this.globalStats.push(...it.activities.activities.filter((stats: { date: string }) => parseInt(stats.date) === parseInt(this.year)))
          this.totalDistance = Object.values(this.globalStats!).reduce((t, {distance}) => t + distance, 0)
          this.totalElevation = (Object.values(this.globalStats!).reduce((t, {elevation}) => t + elevation, 0)).toFixed(2)
          this.totalTime = Object.values(this.globalStats!).reduce((t, {time}) => t + time, 0)
        })
      }
    })
  }

  reset() {
    this.totalDistance = 0
    this.totalElevation = 0
    this.totalTime = 0
    this.globalStats = []
  }
}
