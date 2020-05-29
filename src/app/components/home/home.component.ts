import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pnp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Pen & Paper';

  constructor() {
  }

  ngOnInit() {
  }
}
