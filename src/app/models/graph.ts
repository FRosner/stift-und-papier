import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';
import {Utils} from '@src/app/utils';

export class Graph {
  constructor(public vertices: Vertex[], public edges: Edge[], public xSize: number, public ySize: number) {
  }

  public static initialize(xSize: number, ySize: number): Graph {
    const vertices = Array.from(Array(xSize * ySize).keys())
        .map(i =>
            new Vertex(
                i,
                i % xSize,
                Math.floor(i / xSize),
            ),
        );
    const edges = Utils.flatMap(
        vertices,
        (vertex: Vertex, i: number) => {
          const e: Edge[] = [];
          if (vertex.x < xSize - 1) {
            e.push(Edge.initialize(vertex, vertices[i + 1]));
          }
          if (vertex.y < ySize - 1) {
            e.push(Edge.initialize(vertex, vertices[i + xSize]));
          }
          return e;
        },
    );
    return new Graph(
        vertices,
        edges,
        xSize,
        ySize,
    );
  }

}
