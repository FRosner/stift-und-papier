import {Player} from '@src/app/models/player';
import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';

export class Square {
  constructor(
      public topLeft: Vertex,
      public topRight: Vertex,
      public bottomLeft: Vertex,
      public bottomRight: Vertex,
      public owner: Player | null,
  ) {
  }

  public static fromGraph(graph: Graph): Square[] {
    if (graph.xSize <= 1 || graph.ySize <= 1) {
      return [];
    }
    const squares: Square[] = [];
    for (let x = 0; x < graph.xSize - 1; x++) {
      for (let y = 0; y < graph.ySize - 1; y++) {
        const i = x + y * graph.xSize;
        squares.push(new Square(
            graph.vertices[i],
            graph.vertices[i + 1],
            graph.vertices[i + graph.xSize],
            graph.vertices[i + graph.xSize + 1],
            null,
        ));
      }
    }
    return squares;
  }
}
