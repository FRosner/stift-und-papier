import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';

describe('Graph', () => {
  it('should initialize an empty graph', () => {
    const graph = Graph.initialize(0, 0);
    expect(graph.vertices).toEqual([]);
    expect(graph.edges).toEqual([]);
  });

  it('should initialize a graph with a single node', () => {
    const graph = Graph.initialize(1, 1);
    expect(graph.vertices).toEqual([
      new Vertex(0, 0, 0),
    ]);
    expect(graph.edges).toEqual([]);
  });

  it('should initialize a non-empty graph', () => {
    const graph = Graph.initialize(4, 3);
    expect(graph.vertices).toEqual([
      new Vertex(0, 0, 0),
      new Vertex(1, 1, 0),
      new Vertex(2, 2, 0),
      new Vertex(3, 3, 0),
      new Vertex(4, 0, 1),
      new Vertex(5, 1, 1),
      new Vertex(6, 2, 1),
      new Vertex(7, 3, 1),
      new Vertex(8, 0, 2),
      new Vertex(9, 1, 2),
      new Vertex(10, 2, 2),
      new Vertex(11, 3, 2),
    ]);
    expect(graph.edges).toEqual([]);
  });

});
