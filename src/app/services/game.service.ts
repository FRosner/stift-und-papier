import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Game} from '@src/app/models/game';
import {switchMap} from 'rxjs/operators';
import {Graph} from '@src/app/models/graph';
import {Square} from '@src/app/models/square';
import {Player} from '@src/app/models/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(
      private firestore: AngularFirestore,
  ) {
  }

  private gamesCollection = this.firestore.collection('games');

  getGame(userId: string): Observable<Game> {
    const gameDoc = this.gamesCollection.doc<Game>(userId);
    return gameDoc.get().pipe(
        switchMap(g => {
          if (!g.exists) {
            return from(this.resetGame(userId));
          } else {
            return from(Promise.resolve());
          }
        }),
        switchMap(() => gameDoc.valueChanges()),
    );
  }

  resetGame(userId: string): Promise<void> {
    return this.gamesCollection.doc<Game>(userId).set(this.initializeGame(userId));
  }

  setGame(game: Game): Promise<void> {
    return this.gamesCollection.doc<Game>(game.id).set(game);
  }

  private initializeGame(id: string): Game {
    const graph = Graph.initialize(5, 5);
    return <Game>{
      id: id,
      graph: graph,
      squares: Square.fromGraph(graph),
      players: [
        Player.create(0, 'Alice', 'royalblue', 0),
        Player.create(1, 'Bob', '#F08080', 0),
      ],
      currentPlayerIdx: 0,
    };
  }

}
