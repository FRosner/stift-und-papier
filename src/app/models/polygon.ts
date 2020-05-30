import {Edge} from '@src/app/models/edge';
import {Vertex} from '@src/app/models/vertex';

export class Polygon {
  constructor(public edges: Edge[]) {
  }

  public static fromPath(path: Vertex[]): Polygon {
    if (path.length < 4) {
      throw new Error('Polygon must have at least 4 edges');
    }

    const edges: Edge[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      edges.push(Edge.initialize(path[i], path[i + 1]));
    }
    edges.push(Edge.initialize(path[path.length - 1], path[0]));
    return new Polygon(edges);
  }

}
