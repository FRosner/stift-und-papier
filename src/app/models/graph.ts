import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';

export class Graph {
  constructor(public vertices: Vertex[], public edges: Edge[], public xSize: number, public ySize: number) {
  }

  public static initialize(xSize: number, ySize: number): Graph {
    return new Graph(
        Array.from(Array(xSize * ySize).keys())
            .map(i =>
                new Vertex(
                    i,
                    i % xSize,
                    Math.floor(i / xSize),
                ),
            ),
        [],
        xSize,
        ySize,
    );
  }

}
