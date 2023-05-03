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

  constructor() { }

  ngOnInit(): void {
  }

}
