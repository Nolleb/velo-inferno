import { Component, OnInit } from '@angular/core';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'Velo'
  subtitle: string = 'inferno'
  url: string = 'assets/svg/velo-inferno.svg'

  constructor(private stravaService: StravaService) { }

  isLoading: boolean = false
  activities?: any[] = []
  dateOfTheYear: number = new Date().getFullYear()
  totalDistance: number = 0
  totalElevation: number = 0
  totalTime: number = 0

  ngOnInit(): void {
    this.getFullYear()
  }

  getActivities() {
    this.isLoading = true
    this.stravaService.getActivities().subscribe((res: {activities: any | undefined}) => {
      this.isLoading = false
      this.activities = res.activities?.filter((it: { date: string; }) => parseInt(it.date) === new Date().getFullYear())

      this.totalDistance = Object.values(this.activities!).reduce((t, {distance}) => t + distance, 0)
      this.totalElevation = (Object.values(this.activities!).reduce((t, {elevation}) => t + elevation, 0)).toFixed(2)
      this.totalTime = Object.values(this.activities!).reduce((t, {time}) => t + time, 0)
    })
  }

  getFullYear() {
    return this.dateOfTheYear
  }
}
