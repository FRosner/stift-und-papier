import {Graph} from '@src/app/models/graph';
import {Square} from '@src/app/models/square';
import {Player} from '@src/app/models/player';

export interface Game {
  id: string;
  graph: Graph;
  squares: Square[];
  players: Player[];
  currentPlayerIdx: number;
}
