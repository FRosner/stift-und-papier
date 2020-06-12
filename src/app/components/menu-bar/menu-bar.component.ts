import {Component, Input, OnInit} from '@angular/core';
import {faBars, faHome, faSync} from '@fortawesome/free-solid-svg-icons';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {filter, map} from 'rxjs/operators';
import {isLoggedIn} from '@src/app/models/user-state';

@Component({
  selector: 'pnp-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {

  @Input()
  title: string;

  faBars = faBars;
  faHome = faHome;
  faSync = faSync;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
  ) {
  }

  async resetGame(): Promise<void> {
    return await this.authService.currentUser$.pipe(
      filter(isLoggedIn),
      map(loggedIn => this.gameService.resetGame(loggedIn.user.uid)),
    ).toPromise();
  }

  ngOnInit() {
  }

}
