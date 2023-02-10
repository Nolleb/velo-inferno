import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { latLng } from 'leaflet';
import { map, Observable, Subject } from 'rxjs';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  isLoading: boolean = false
  year: string = ''
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8']
  totalDistance: number = 0
  totalElevation: number = 0
  totalTime: number = 0
  globalStats: any[] = []
  stats: any[] = []

  constructor(private stravaService: StravaService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    //window.location.reload()
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("year")) {
        this.year = paramMap.get("year") || ''
        this.isLoading = true
        this.reset()

        this.numbers.map((year: string) => {

          this.stravaService.getActivitiesPage(year).subscribe(it =>{

            this.isLoading = false
            this.globalStats.push(...it.activities)
            this.stats = this.globalStats.filter(stats => parseInt(stats.date) === parseInt(this.year))

            this.totalDistance = Object.values(this.stats!).reduce((t, {distance}) => t + distance, 0)
            this.totalElevation = (Object.values(this.stats!).reduce((t, {elevation}) => t + elevation, 0)).toFixed(2)
            this.totalTime = Object.values(this.stats!).reduce((t, {time}) => t + time, 0)
          })
        })
      }
    })
  }

  reset() {
    this.totalDistance = 0
    this.totalElevation = 0
    this.totalTime = 0
    this.globalStats = []
    this.stats = []
  }

  generateArrayOfYears() {
    const max = new Date().getFullYear()
    const min = max - 5
    const years = []

    for (let i = max; i >= min; i--) {
      years.push(i.toString())
    }
    return years
  }
}
