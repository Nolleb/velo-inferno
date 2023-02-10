import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class StravaService {

  baseUrl = "http://local.rtl.fr:3000/api/strava"
  //baseUrlStarred = "http://local.rtl.fr:3000/api/strava/starred"
  baseUrlActivity = "http://local.rtl.fr:3000/api/strava/activity/"

  constructor(private http: HttpClient, private router: Router) { }


  getActivities() {
    return this.http.get<{activities: any}>(this.baseUrl)
  }

  getActivitiesPage(page: string) {
    return this.http.get<{token: string, activities: any}>(this.baseUrl + "/" +page)
  }

  getActivity(id: string) {
    return this.http.get<{ token: string, activity: any, coords: any, activeSegments: any }>(this.baseUrlActivity + id)
  }
}
