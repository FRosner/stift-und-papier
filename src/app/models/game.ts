import {Graph} from '@src/app/models/graph';
import {Square} from '@src/app/models/square';
import {Player} from '@src/app/models/player';

export class Game {
  constructor(
      public id: string,
      public graph: Graph,
      public squares: Square[],
      public players: Player[],
      public currentPlayerIdx: number,
  ) {
  }

  public serialize() {
    return {
      ...this,
      graph: this.graph.serialize(),
      squares: this.squares.map(s => s.serialize()),
      players: this.players.map(p => p.serialize()),
    };
  }
}
