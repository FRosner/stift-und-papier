import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';
import {Utils} from '@src/app/utils';
import {SearchVertex} from '@src/app/models/search-vertex';

export interface Graph {
  vertices: Vertex[];
  edges: Edge[];
  xSize: number;
  ySize: number;
}

export const Graph = {
  initialize: (xSize: number, ySize: number) => {
    const vertices = Array.from(Array(xSize * ySize).keys())
        .map(i =>
            Vertex.create(
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
    return <Graph>{
      vertices: vertices,
      edges: edges,
      xSize: xSize,
      ySize: ySize,
    };
  },

  findPath: (graph: Graph, start: Vertex, end: Vertex) => {
    let found = false;
    const pathStack: Vertex[] = [];
    let finalPath: Vertex[] = [];

    function search(v: SearchVertex) {
      pathStack.push(v.self);
      if (v.self === end) {
        found = true;
        finalPath = [...pathStack];
        return;
      } else {
        v.seen = true;
        for (let i = 0; i < v.neighbors.length; i++) {
          const neighbor = v.neighbors[i];
          if (!neighbor.seen && !found) {
            search(neighbor);
          }
        }
      }
      pathStack.pop();
    }

    const searchGraph = graph.vertices.map(SearchVertex.fromVertex);
    graph.edges.filter(Edge.isOwned)
        .forEach(edge => {
          searchGraph[edge.source.id].neighbors.push(searchGraph[edge.target.id]);
          searchGraph[edge.target.id].neighbors.push(searchGraph[edge.source.id]);
        });
    search(searchGraph[start.id]);
    return finalPath;
  },
};

