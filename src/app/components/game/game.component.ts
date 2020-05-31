import {Component, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Player} from '@src/app/models/player';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';
import {Polygon} from '@src/app/models/polygon';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  constructor() {
  }

  private currentPlayerIdx = 0;

  graph = Graph.initialize(5, 5);
  squares = Square.fromGraph(this.graph);
  players = [
    new Player(0, 'Alice', 'royalblue', 0),
    new Player(1, 'Bob', '#F08080', 0),
  ];

  svgScalingFactor = 25;
  viewBox = {
    width: this.graph.xSize * this.svgScalingFactor,
    height: this.graph.ySize * this.svgScalingFactor,
  };
  defaultEdgeStroke = '#ccc';
  edgeStrokes = this.graph.edges.map(() => this.defaultEdgeStroke);

  get currentPlayer() {
    return this.players[this.currentPlayerIdx];
  }

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  drawEdge(edge: Edge, player: Player) {
    if (!Edge.isOwned(edge)) {
      const path = this.graph.findPath(edge.source, edge.target);
      if (path.length > 0) {
        const polygon = Polygon.fromPath(path);
        const wonSquares = this.squares.filter(square => polygon.contains(square) && !square.isOwned());
        wonSquares.forEach(square => square.owner = player);
        player.score += wonSquares.length;
      } else {
        this.nextPlayer();
      }
      edge.owner = player;
    }
  }

  nextPlayer() {
    if (this.currentPlayerIdx === this.players.length - 1) {
      this.currentPlayerIdx = 0;
    } else {
      this.currentPlayerIdx++;
    }
  }

  ngOnInit() {
  }

}
