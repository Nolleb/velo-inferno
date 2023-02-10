import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { ArchivesComponent } from "./archives/archives.component";
import { RidesComponent } from "./rides/rides.component";

const routes: Routes = [
  {path: '', component: RidesComponent},
  {path: ':page', component: RidesComponent},
  {path: 'activity/:id', component: ActivityComponent},
  {path: 'archives/:year', component: ArchivesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
}
