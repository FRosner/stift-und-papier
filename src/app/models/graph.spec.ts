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
    const player = new Player('player', 'green');

    it('should not detect a path if there is none due to missing ownership in a trivial graph', () => {
      const graph = Graph.initialize(1, 2);
      expect(graph.findPath(graph.vertices[0], graph.vertices[1])).toEqual(false);
    });

    it('should detect an existing path in a trivial graph', () => {
      const graph = Graph.initialize(1, 2);
      graph.edges[0].owner = player;
      expect(graph.findPath(graph.vertices[0], graph.vertices[1])).toEqual(true);
    });

    it('should not detect a path if there is none due to missing ownership in a complex graph', () => {
      const graph = Graph.initialize(100, 100);
      expect(graph.findPath(graph.vertices[0], graph.vertices[99])).toEqual(false);
    });

    it('should detect an existing path in a complex graph', () => {
      const graph = Graph.initialize(100, 100);
      for (let x = 0; x < graph.xSize - 1; x++) {
        graph.edges.find(e => e.source.x === x && e.source.y === 0).owner = player;
      }
      for (let y = 0; y < graph.xSize - 1; y++) {
        graph.edges.find(e => e.source.x === graph.xSize - 1 && e.source.y === y).owner = player;
      }
      expect(graph.findPath(graph.vertices[0], graph.vertices[graph.vertices.length - 1])).toEqual(true);
    });
  });
});
