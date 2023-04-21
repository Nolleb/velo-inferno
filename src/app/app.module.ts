import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { RidesComponent } from './rides/rides.component';
import { KmPipe } from './pipes/toKilometre';
import { SpeedPipe } from './pipes/convertSpeed';
import localeFr from '@angular/common/locales/fr';
import { DatePipe } from './pipes/date';
import { LoaderComponent } from './loader/loader.component';
import { HourPipe } from './pipes/secondsToHours';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { KeysPipe } from './pipes/object-key';
import { ArchivesComponent } from './archives/archives.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StatsComponent } from './stats/stats.component';

registerLocaleData(localeFr, 'fr')
moment.locale('fr');

@NgModule({
  declarations: [
    AppComponent,
    KmPipe,
    SpeedPipe,
    DatePipe,
    HourPipe,
    KeysPipe,
    ActivityComponent,
    HeaderComponent,
    RidesComponent,
    LoaderComponent,
    FooterComponent,
    MapComponent,
    ArchivesComponent,
    BarChartComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
    NgxPaginationModule
  ],
providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
