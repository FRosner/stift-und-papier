import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';

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
});
