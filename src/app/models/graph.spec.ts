import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';
import {Edge} from '@src/app/models/edge';
import {Player} from '@src/app/models/player';

describe('Graph', () => {
  describe('Initialization', () => {
    it('should initialize an empty graph', () => {
      const graph = Graph.initialize(0, 0);
      expect(graph.vertices).toEqual([]);
      expect(graph.edges).toEqual([]);
    });

    it('should initialize a graph with a single node', () => {
      const graph = Graph.initialize(1, 1);
      expect(graph.vertices).toEqual([
        Vertex.create(0, 0, 0),
      ]);
      expect(graph.edges).toEqual([]);
    });

    it('should initialize a non-empty graph', () => {
      const graph = Graph.initialize(4, 3);
      expect(graph.vertices).toEqual([
        Vertex.create(0, 0, 0),
        Vertex.create(1, 1, 0),
        Vertex.create(2, 2, 0),
        Vertex.create(3, 3, 0),
        Vertex.create(4, 0, 1),
        Vertex.create(5, 1, 1),
        Vertex.create(6, 2, 1),
        Vertex.create(7, 3, 1),
        Vertex.create(8, 0, 2),
        Vertex.create(9, 1, 2),
        Vertex.create(10, 2, 2),
        Vertex.create(11, 3, 2),
      ]);
      expect(graph.edges).toEqual(jasmine.arrayContaining([
        Edge.initialize(graph.vertices[0], graph.vertices[1]),
        Edge.initialize(graph.vertices[1], graph.vertices[2]),
        Edge.initialize(graph.vertices[2], graph.vertices[3]),
        Edge.initialize(graph.vertices[0], graph.vertices[4]),
        Edge.initialize(graph.vertices[1], graph.vertices[5]),
        Edge.initialize(graph.vertices[2], graph.vertices[6]),
        Edge.initialize(graph.vertices[3], graph.vertices[7]),
        Edge.initialize(graph.vertices[4], graph.vertices[5]),
        Edge.initialize(graph.vertices[5], graph.vertices[6]),
        Edge.initialize(graph.vertices[6], graph.vertices[7]),
        Edge.initialize(graph.vertices[4], graph.vertices[8]),
        Edge.initialize(graph.vertices[5], graph.vertices[9]),
        Edge.initialize(graph.vertices[6], graph.vertices[10]),
        Edge.initialize(graph.vertices[7], graph.vertices[11]),
        Edge.initialize(graph.vertices[8], graph.vertices[9]),
        Edge.initialize(graph.vertices[9], graph.vertices[10]),
        Edge.initialize(graph.vertices[10], graph.vertices[11]),
      ]));
    });
  });

  describe('findPath', () => {
    const player = Player.create(0, 'currentPlayer', 'green', 0);

    it('should not detect a path if there is none due to missing ownership in a trivial graph', () => {
      const graph = Graph.initialize(1, 2);
      expect(Graph.findPath(graph, graph.vertices[0], graph.vertices[1])).toEqual([]);
    });

    it('should detect an existing path in a trivial graph', () => {
      const graph = Graph.initialize(1, 2);
      graph.edges[0].owner = player;
      expect(Graph.findPath(graph, graph.vertices[0], graph.vertices[1])).toEqual([graph.vertices[0], graph.vertices[1]]);
    });

    it('should not detect a path if there is none due to missing ownership in a complex graph', () => {
      const graph = Graph.initialize(100, 100);
      expect(Graph.findPath(graph, graph.vertices[0], graph.vertices[99])).toEqual([]);
    });

    it('should detect an existing path in a complex graph', () => {
      const graph = Graph.initialize(100, 100);
      const expectedPath: Vertex[] = [graph.vertices[0]];
      for (let x = 0; x < graph.xSize - 1; x++) {
        const edge = graph.edges.find(e => e.source.x === x && e.source.y === 0);
        edge.owner = player;
        expectedPath.push(edge.target);
      }
      for (let y = 0; y < graph.xSize - 1; y++) {
        const edge = graph.edges.find(e => e.source.x === graph.xSize - 1 && e.source.y === y);
        edge.owner = player;
        expectedPath.push(edge.target);
      }
      expect(Graph.findPath(graph, graph.vertices[0], graph.vertices[graph.vertices.length - 1])).toEqual(expectedPath);
    });
  });
});
