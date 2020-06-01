import {Component, OnInit} from '@angular/core';
import {AuthService} from '@src/app/services/auth.service';

@Component({
  selector: 'pnp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Pen & Paper';

  constructor(
      public auth: AuthService,
  ) {
  }

  ngOnInit() {
  }
}
