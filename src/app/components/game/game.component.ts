import {Component, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
import {Player} from '@src/app/models/player';
import {Edge} from '@src/app/models/edge';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  constructor() {
  }

  graph = Graph.initialize(4, 4);

  svgScalingFactor = 25;
  viewBox = {
    width: this.graph.xSize * this.svgScalingFactor,
    height: this.graph.ySize * this.svgScalingFactor,
  };

  player = new Player('Alice', 'royalblue');

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  drawEdge(edge: Edge) {
    edge.owner = this.player;
  }

  ngOnInit() {
  }

}
