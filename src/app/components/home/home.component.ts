import {Component, OnInit} from '@angular/core';
import {AuthService} from '@src/app/services/auth.service';
import {GameService} from '@src/app/services/game.service';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pnp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Pen & Paper';
  googleIcon = faGoogle;
  logoutIcon = faSignOutAlt;

  constructor(
      public auth: AuthService,
      public game: GameService,
  ) {
  }

  ngOnInit() {
  }
}
