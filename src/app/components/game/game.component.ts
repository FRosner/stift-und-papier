import {Component, OnInit} from '@angular/core';
import {Graph} from '@src/app/models/graph';
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

  scalePosition(pos: number): number {
    return pos * this.svgScalingFactor + (this.svgScalingFactor / 2);
  }

  ngOnInit() {
    this.graph.edges.push(new Edge(this.graph.vertices[0], this.graph.vertices[1]));
  }

}
