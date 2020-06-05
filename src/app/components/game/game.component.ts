import {Component, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Player} from '@src/app/models/player';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';
import {Polygon} from '@src/app/models/polygon';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {switchMap} from 'rxjs/operators';
import {Game} from '@src/app/models/game';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  constructor(
      public gameService: GameService,
      public auth: AuthService,
  ) {
  }

  game$ = this.auth.getUser().pipe(
      switchMap(user => this.gameService.getGame(user.uid)),
  );

  game = this.newGame();

  svgScalingFactor = 25;
  viewBox = {
    width: this.game.graph.xSize * this.svgScalingFactor,
    height: this.game.graph.ySize * this.svgScalingFactor,
  };
  defaultEdgeStroke = '#ccc';
  edgeStrokes = this.game.graph.edges.map(() => this.defaultEdgeStroke);

  get currentPlayer() {
    return this.game.players[this.game.currentPlayerIdx];
  }

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  drawEdge(edge: Edge, player: Player) {
    if (!Edge.isOwned(edge)) {
      const path = this.game.graph.findPath(edge.source, edge.target);
      if (path.length > 0) {
        const polygon = Polygon.fromPath(path);
        const wonSquares = this.game.squares.filter(square => polygon.contains(square) && !square.isOwned());
        wonSquares.forEach(square => square.owner = player);
        player.score += wonSquares.length;
      } else {
        this.nextPlayer();
      }
      edge.owner = player;
    }
  }

  nextPlayer() {
    if (this.game.currentPlayerIdx === this.game.players.length - 1) {
      this.game.currentPlayerIdx = 0;
    } else {
      this.game.currentPlayerIdx++;
    }
  }

  newGame(): Game {
    const graph = Graph.initialize(5, 5);
    return new Game(
        '1234',
        graph,
        Square.fromGraph(graph),
        [
          new Player(0, 'Alice', 'royalblue', 0),
          new Player(1, 'Bob', '#F08080', 0),
        ],
        0,
    );
  }

  ngOnInit() {
  }

}
