import {Edge} from '@src/app/models/edge';
import {Vertex} from '@src/app/models/vertex';
import {Square} from '@src/app/models/square';

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

  /*
    Checks whether the square is contained within the polygon. We use
    a simplified version of the ray casting algorithm. To solve our
    square-in-polygon problem, we cast a ray from the center of the square
    to the right and count the number of intersections with the polygon.
    If the number of intersections is odd, the square lies within the polygon.

    See the test cases for examples.
   */
  public contains(square: Square): boolean {
    const isVertical = (e: Edge) =>
        e.source.x === e.target.x;
    const squareIsLeftFromEdge = (s: Square, e: Edge) =>
        s.topRight.x <= e.source.x;
    const hasSameY = (s: Square, e: Edge) =>
        Math.min(e.source.y, e.target.y) === square.topRight.y &&
        Math.max(e.source.y, e.target.y) === square.bottomRight.y;

    const numIntersections = this.edges
        .filter(edge => isVertical(edge) && squareIsLeftFromEdge(square, edge) && hasSameY(square, edge))
        .length;
    return numIntersections % 2 === 1;
  }

}

