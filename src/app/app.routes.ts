import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {GameComponent} from '@src/app/game/game.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
];
