import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StravaService } from '../strava.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activityId!: string
  activity: any
  isLoading: boolean = false
  isHovered: boolean = false
  indexSegment: number = -1
  starredSegments: any[] = []
  coords: any
  coordsSegment: any[][] = []

  coordsLatLng: L.LatLngTuple[] = []
  coordsSegments:number[][] | undefined
  elevation: number[] = []
  distanceLabels: string[] = []


  constructor(private stravaService: StravaService, public route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.coordsLatLng = this.coords as L.LatLngTuple[]
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("id")) {
        this.activityId = paramMap.get("id") || ''
        this.isLoading = true
        this.stravaService.getActivity(this.activityId).subscribe(response =>{
          this.isLoading = false
          this.activity = response.activity
          console.log("activity", response.coords)


          this.coords = response.coords
          //this.elevation = this.elevation.push(response.elevation.elevationData)
          //this.distanceLabels =

          response.elevation.forEach((it: any) => {
            this.distanceLabels.push(it.name)
            this.elevation.push(it.elevationData)
          })
          //this.elevation.flat(1)
          console.log("elevation", this.elevation)
          this.starredSegments = response.activeSegments
          response.activeSegments.forEach((segment: any) => {
            this.coordsSegment.push(segment.coords)
          })
        })
      }
    })
  }

  onMouseover(e: MouseEvent, index: number) {
    e.preventDefault()
    this.indexSegment = index
    this.isHovered = true
  }

  onMouseout(e: MouseEvent) {
    e.preventDefault()
    this.isHovered = false
  }

  goPreviousPage(e: MouseEvent) {
    e.preventDefault()
    this.location.back();
  }
}

