import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss'],
})

export class RidesComponent implements OnInit {

  activities: any[] = []
  isLoading: boolean = false
  pageParam: string = ''
  sortProperty: string = 'id'
  sortOrder = 1
  allRides: number | undefined = 0
  pagination: number = 1
  limit: number = 15
  next: object | undefined
  prev: object | undefined

  constructor(private stravaService: StravaService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getActivities()
  }

  getActivities() {

    this.isLoading = true
    this.stravaService.getPaginatedActivities(this.pagination, this.limit).subscribe((res: {activities: any}) => {
      this.isLoading = false

      this.next = res.activities?.next
      this.prev = res.activities?.previous

      this.activities = res.activities.activities
      this.allRides = res.activities?.activities.length
    })
  }

  prevPagination() {
    this.pagination = this.pagination - 1
    this.getActivities()
  }

  nextPagination() {
    this.pagination = this.pagination + 1
    this.getActivities()
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
