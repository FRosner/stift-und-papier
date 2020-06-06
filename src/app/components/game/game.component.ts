import {Component, OnDestroy, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Player} from '@src/app/models/player';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';
import {Polygon} from '@src/app/models/polygon';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {Game} from '@src/app/models/game';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {

  game$ = new BehaviorSubject<Game | null>(null);
  onlineGame$ = this.auth.getUser().pipe(
      switchMap(user => this.gameService.getGame(user.uid)),
  );
  private onlineGameSubscription: Subscription | null = null;
  svgScalingFactor = 25;
  viewBox$ = this.game$.pipe(
      map(game => ({
            width: game.graph.xSize * this.svgScalingFactor,
            height: game.graph.ySize * this.svgScalingFactor,
          }),
      ),
  );
  defaultEdgeStroke = '#ccc';
  edgeStrokes$ = this.game$.pipe(
      map(game => game.graph.edges.map(() => this.defaultEdgeStroke)),
  );

  constructor(
      public gameService: GameService,
      public auth: AuthService,
  ) {
  }

  currentPlayer(game: Game) {
    return game.players[game.currentPlayerIdx];
  }

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  drawEdge(edge: Edge, game: Game) {
    if (!Edge.isOwned(edge)) {
      const player = this.currentPlayer(game);
      const path = Graph.findPath(game.graph, edge.source, edge.target);
      if (path.length > 0) {
        const polygon = Polygon.fromPath(path);
        const wonSquares = game.squares.filter(square => polygon.contains(square) && !Square.isOwned(square));
        wonSquares.forEach(square => square.owner = player);
        player.score += wonSquares.length;
      } else {
        this.nextPlayer(game);
      }
      edge.owner = player;
      this.game$.next(game);
      this.gameService.setGame(game);
    }
  }

  nextPlayer(game: Game) {
    if (game.currentPlayerIdx === game.players.length - 1) {
      game.currentPlayerIdx = 0;
    } else {
      game.currentPlayerIdx++;
    }
  }

  newGame(gameId: string): Game {
    const graph = Graph.initialize(5, 5);
    return <Game>{
      id: gameId,
      graph: graph,
      squares: Square.fromGraph(graph),
      players: [
        Player.create(0, 'Alice', 'royalblue', 0),
        Player.create(1, 'Bob', '#F08080', 0),
      ],
      currentPlayerIdx: 0,
    };
  }

  ngOnInit() {
    this.onlineGameSubscription = this.onlineGame$.subscribe(this.game$);
  }

  ngOnDestroy() {
    if (this.onlineGameSubscription) {
      this.onlineGameSubscription.unsubscribe();
    }
  }

}
