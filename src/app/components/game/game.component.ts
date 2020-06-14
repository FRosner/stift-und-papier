import {Component, OnDestroy, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';
import {Polygon} from '@src/app/models/polygon';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {Game} from '@src/app/models/game';
import {UserStateType} from '@src/app/models/user-state';
import {ActivatedRoute} from '@angular/router';
import {EdgeStyle} from '@src/app/models/edge-style';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(
      public gameService: GameService,
      public auth: AuthService,
      private route: ActivatedRoute,
  ) {
  }

  game$ = this.route.paramMap.pipe(
      switchMap(params => this.gameService.getGame(params.get('id'))),
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
  defaultEdgeDashArray = 2000;
  edgeStrokes$ = this.game$.pipe(
      map(game => game.graph.edges.map(() => (<EdgeStyle>{
        stroke: this.defaultEdgeStroke,
      }))),
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
      if (Array.isArray(game.moves)) {
        game.moves.push(edge);
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

  wasRecentlyDrawn(edge: Edge, game: Game): boolean {
    if (Array.isArray(game.moves) && game.moves.length > 0) {
      const lastMove = game.moves[game.moves.length - 1];
      return Edge.hasSameCoordinates(edge, lastMove);
    } else {
      return false;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
