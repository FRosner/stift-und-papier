import {Routes} from '@angular/router';

import {HomeComponent} from '@src/app/components/home/home.component';
import {GameComponent} from '@src/app/components/game/game.component';

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
    path: 'game/:id',
    component: GameComponent,
  },
];
