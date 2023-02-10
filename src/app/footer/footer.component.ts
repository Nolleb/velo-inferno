import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  dateOfTheYear: number = new Date().getFullYear()
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getFullYear()
  }

  getFullYear() {
      return this.dateOfTheYear
  }

  onClick(e: MouseEvent, year: string): void {
    e.preventDefault()
    this.router.navigate(['/archives', year]);
    //window.location.reload()
  }
}
