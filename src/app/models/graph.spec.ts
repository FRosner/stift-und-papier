import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';

describe('Graph', () => {
  it('should initialize an empty graph', () => {
    const graph = Graph.initialize(0);
    expect(graph.vertices).toEqual([]);
    expect(graph.edges).toEqual([]);
  });

  it('should initialize a non-empty graph', () => {
    const graph = Graph.initialize(5);
    expect(graph.vertices).toEqual([
      new Vertex(0),
      new Vertex(1),
      new Vertex(2),
      new Vertex(3),
      new Vertex(4)
    ]);
    expect(graph.edges).toEqual([]);
  });

  it('should add an edge correctly', () => {
    const graph = Graph.initialize(2)
        .addEdge(0, 1);
    const v1 = new Vertex(0);
    const v2 = new Vertex(1);
    expect(graph.vertices).toEqual([v1, v2]);
    expect(graph.edges).toEqual([new Edge(v1, v2)]);
  });

  it('should add a vertex correctly', () => {
    const graph = Graph.initialize(2)
        .addVertex();
    expect(graph.vertices).toEqual(
        [
          new Vertex(0),
          new Vertex(1),
          new Vertex(2)
        ]
    );
  });

});
