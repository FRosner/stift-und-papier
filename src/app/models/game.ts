import {Graph} from '@src/app/models/graph';
import {Square} from '@src/app/models/square';
import {Player} from '@src/app/models/player';
import {Edge} from '@src/app/models/edge';

export interface Game {
  id: string;
  graph: Graph;
  squares: Square[];
  players: Player[];
  currentPlayerIdx: number;
  moves: Edge[] | undefined;
}
