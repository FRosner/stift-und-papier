import {Component, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';

@Component({
  selector: 'pnp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  constructor() {
  }

  graph = Graph.initialize(4, 4);

  circleWidth = 1;
  svgScalingFactor = 10;
  viewBox = {
    width: this.graph.xSize * this.svgScalingFactor,
    height: this.graph.ySize * this.svgScalingFactor,
  };

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  ngOnInit() {
  }

}
