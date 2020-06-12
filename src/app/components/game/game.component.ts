import {Component, OnDestroy, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';
import {Polygon} from '@src/app/models/polygon';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {Game} from '@src/app/models/game';
import {isLoggedIn, UserStateType} from '@src/app/models/user-state';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(
    public gameService: GameService,
    public auth: AuthService,
  ) {
  }

  game$ = this.auth.currentUser$.pipe(
    filter(isLoggedIn),
    switchMap(loggedIn => this.gameService.getGame(loggedIn.user.uid)),
  );
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

  userState = UserStateType;

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

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
