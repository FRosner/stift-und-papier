import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';

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
    expect(graph.edges).toEqual(jasmine.arrayContaining([
      new Edge(graph.vertices[0], graph.vertices[1]),
      new Edge(graph.vertices[1], graph.vertices[2]),
      new Edge(graph.vertices[2], graph.vertices[3]),
      new Edge(graph.vertices[0], graph.vertices[4]),
      new Edge(graph.vertices[1], graph.vertices[5]),
      new Edge(graph.vertices[2], graph.vertices[6]),
      new Edge(graph.vertices[3], graph.vertices[7]),
      new Edge(graph.vertices[4], graph.vertices[5]),
      new Edge(graph.vertices[5], graph.vertices[6]),
      new Edge(graph.vertices[6], graph.vertices[7]),
      new Edge(graph.vertices[4], graph.vertices[8]),
      new Edge(graph.vertices[5], graph.vertices[9]),
      new Edge(graph.vertices[6], graph.vertices[10]),
      new Edge(graph.vertices[7], graph.vertices[11]),
      new Edge(graph.vertices[8], graph.vertices[9]),
      new Edge(graph.vertices[9], graph.vertices[10]),
      new Edge(graph.vertices[10], graph.vertices[11]),
    ]));
  });

});
