import {Component, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Player} from '@src/app/models/player';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';
import {Polygon} from '@src/app/models/polygon';
import {ScoreBoard} from '@src/app/models/score-board';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  constructor() {
  }

  graph = Graph.initialize(4, 3);
  squares = Square.fromGraph(this.graph);
  player = new Player(0, 'Alice', 'royalblue');
  scoreBoard: ScoreBoard = {};

  svgScalingFactor = 25;
  viewBox = {
    width: this.graph.xSize * this.svgScalingFactor,
    height: this.graph.ySize * this.svgScalingFactor,
  };

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
        this.scoreBoard[player.id] += wonSquares.length;
      }
      edge.owner = player;
    }
  }

  ngOnInit() {
    this.scoreBoard[this.player.id] = 0;
  }

}
