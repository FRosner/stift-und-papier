import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';
import {Utils} from '@src/app/utils';
import {SearchVertex} from '@src/app/models/search-vertex';

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

  public findPath(start: Vertex, end: Vertex): boolean {
    let found = false;

    function search(v: SearchVertex) {
      if (v.self === end) {
        found = true;
        return;
      } else {
        v.seen = true;
        for (let i = 0; i < v.neighbors.length; i++) {
          const neighbor = v.neighbors[i];
          if (!neighbor.seen) {
            search(neighbor);
          }
        }
      }
    }

    const searchGraph = this.vertices.map(SearchVertex.fromVertex);
    this.edges.filter(Edge.isOwned)
        .forEach(edge => {
          searchGraph[edge.source.id].neighbors.push(searchGraph[edge.target.id]);
          searchGraph[edge.target.id].neighbors.push(searchGraph[edge.source.id]);
        });
    search(searchGraph[start.id]);
    return found;
  }

}
