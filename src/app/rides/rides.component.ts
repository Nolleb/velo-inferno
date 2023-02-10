import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss'],
})

export class RidesComponent implements OnInit {
  activities?: any[] = []
  isLoading: boolean = false
  pageParam: string = ''
  sortProperty: string = 'id'
  sortOrder = 1;

  constructor(private stravaService: StravaService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("page")) {
        this.pageParam = paramMap.get("page") || ''
        this.isLoading = true
        this.stravaService.getActivitiesPage(this.pageParam).subscribe(response =>{
          this.isLoading = false
          this.activities = response.activities
        })
      } else {
        this.getActivities()
      }
    })
  }

  getActivities() {
    this.isLoading = true
    this.stravaService.getActivities().subscribe((res: {activities: any[] | undefined;}) => {
      this.isLoading = false
      this.activities = res.activities
    })
  }

  sortBy(property: string,) {
    this.sortProperty = property
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.activities = [...this.activities!.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
          result = -1;
      }
      if (a[property] > b[property]) {
          result = 1;
      }
      return result * this.sortOrder;
    })];
  }


  sortIcon(property: string) {
    if (property === this.sortProperty) {
        return this.sortOrder === 1 ? 'arrow_drop_up' : 'arrow_drop_down';
    }
    return '';
  }
}
