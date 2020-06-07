import {Component, Input, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {first} from 'rxjs/operators';
import {getOrElse, map} from 'fp-ts/es6/Option';
import {User} from '@src/app/models/user';
import {pipe} from 'fp-ts/es6/pipeable';

@Component({
  selector: 'pnp-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {

  @Input()
  title: string;

  faBars = faBars;

  constructor(
      private gameService: GameService,
      private authService: AuthService,
  ) {
  }

  async resetGame(): Promise<void> {
    const currentUser = await this.authService.currentUser$.pipe(first()).toPromise();
    return pipe(
        currentUser,
        map((user: User) => this.gameService.resetGame(user.uid)),
        getOrElse(() => Promise.resolve()),
    );
  }

  ngOnInit() {
  }

}
