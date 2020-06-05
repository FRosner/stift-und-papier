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
    const gameDoc = this.gamesCollection.doc<any>(userId);
    return gameDoc.get().pipe(
        switchMap(g => {
          if (!g.exists) {
            return from(gameDoc.set(this.newGame(userId).serialize()));
          } else {
            return from(Promise.resolve());
          }
        }),
        switchMap(() => gameDoc.valueChanges()),
    );
  }

  private newGame(id: string): Game {
    const graph = Graph.initialize(5, 5);
    return new Game(
        id,
        graph,
        Square.fromGraph(graph),
        [
          new Player(0, 'Alice', 'royalblue', 0),
          new Player(1, 'Bob', '#F08080', 0),
        ],
        0,
    );
  }

}
