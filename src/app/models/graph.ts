import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';

export class Graph {
  constructor(public vertices: Vertex[], public edges: Edge[]) {
  }

  public static initialize(numVertices: number): Graph {
    return new Graph(
        Array.from(Array(numVertices).keys())
            .map(i => new Vertex(i)),
        []
    );
  }

  public addEdge(sourceId: number, targetId: number): Graph {
    const newEdges = [
      ...this.edges,
      new Edge(this.vertices[sourceId], this.vertices[targetId])
    ];
    return new Graph(this.vertices, newEdges);
  }
}
