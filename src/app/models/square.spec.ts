import {Graph} from '@src/app/models/graph';
import {Square} from '@src/app/models/square';
import {Vertex} from '@src/app/models/vertex';

describe('Square', () => {
  describe('fromGraph', () => {
    it('should initialize from an empty graph', () => {
      const graph = Graph.initialize(0, 0);
      const squares = Square.fromGraph(graph);
      expect(squares).toEqual([]);
    });

    it('should initialize from a single vertex graph', () => {
      const graph = Graph.initialize(1, 1);
      const squares = Square.fromGraph(graph);
      expect(squares).toEqual([]);
    });

    it('should initialize from a single square graph', () => {
      const graph = Graph.initialize(2, 2);
      const squares = Square.fromGraph(graph);
      expect(squares).toEqual([
        Square.create(
            Vertex.create(0, 0, 0),
            Vertex.create(1, 1, 0),
            Vertex.create(2, 0, 1),
            Vertex.create(3, 1, 1),
            null,
        ),
      ]);
    });

    it('should initialize from a complex graph', () => {
      const graph = Graph.initialize(4, 3);
      const squares = Square.fromGraph(graph);
      expect(squares).toEqual(jasmine.arrayContaining([
        Square.create(
            Vertex.create(0, 0, 0),
            Vertex.create(1, 1, 0),
            Vertex.create(4, 0, 1),
            Vertex.create(5, 1, 1),
            null,
        ),
        Square.create(
            Vertex.create(1, 1, 0),
            Vertex.create(2, 2, 0),
            Vertex.create(5, 1, 1),
            Vertex.create(6, 2, 1),
            null,
        ),
        Square.create(
            Vertex.create(2, 2, 0),
            Vertex.create(3, 3, 0),
            Vertex.create(6, 2, 1),
            Vertex.create(7, 3, 1),
            null,
        ),
        Square.create(
            Vertex.create(4, 0, 1),
            Vertex.create(5, 1, 1),
            Vertex.create(8, 0, 2),
            Vertex.create(9, 1, 2),
            null,
        ),
        Square.create(
            Vertex.create(5, 1, 1),
            Vertex.create(6, 2, 1),
            Vertex.create(9, 1, 2),
            Vertex.create(10, 2, 2),
            null,
        ),
        Square.create(
            Vertex.create(6, 2, 1),
            Vertex.create(7, 3, 1),
            Vertex.create(10, 2, 2),
            Vertex.create(11, 3, 2),
            null,
        ),
      ]));
    });
  });
});
