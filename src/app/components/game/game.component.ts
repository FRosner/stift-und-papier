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

  graph = Graph.initialize(4, 3);
  squares = Square.fromGraph(this.graph);

  svgScalingFactor = 25;
  viewBox = {
    width: this.graph.xSize * this.svgScalingFactor,
    height: this.graph.ySize * this.svgScalingFactor,
  };

  player = new Player('Alice', 'royalblue');

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  drawEdge(edge: Edge, player: Player) {
    if (!Edge.isOwned(edge)) {
      const path = this.graph.findPath(edge.source, edge.target);
      if (path.length > 0) {
        const polygon = Polygon.fromPath(path);
        const wonSquares = this.squares
            .filter(s => polygon.contains(s) && !s.isOwned());
        wonSquares.forEach(s => s.owner = player);
      }
      edge.owner = player;
    }
  }

  ngOnInit() {
  }

}
