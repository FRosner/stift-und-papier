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
        new Square(
            new Vertex(0, 0, 0),
            new Vertex(1, 1, 0),
            new Vertex(2, 0, 1),
            new Vertex(3, 1, 1),
            null,
        ),
      ]);
    });

    it('should initialize from a complex graph', () => {
      const graph = Graph.initialize(4, 3);
      const squares = Square.fromGraph(graph);
      expect(squares).toEqual(jasmine.arrayContaining([
        new Square(
            new Vertex(0, 0, 0),
            new Vertex(1, 1, 0),
            new Vertex(4, 0, 1),
            new Vertex(5, 1, 1),
            null,
        ),
        new Square(
            new Vertex(1, 1, 0),
            new Vertex(2, 2, 0),
            new Vertex(5, 1, 1),
            new Vertex(6, 2, 1),
            null,
        ),
        new Square(
            new Vertex(2, 2, 0),
            new Vertex(3, 3, 0),
            new Vertex(6, 2, 1),
            new Vertex(7, 3, 1),
            null,
        ),
        new Square(
            new Vertex(4, 0, 1),
            new Vertex(5, 1, 1),
            new Vertex(8, 0, 2),
            new Vertex(9, 1, 2),
            null,
        ),
        new Square(
            new Vertex(5, 1, 1),
            new Vertex(6, 2, 1),
            new Vertex(9, 1, 2),
            new Vertex(10, 2, 2),
            null,
        ),
        new Square(
            new Vertex(6, 2, 1),
            new Vertex(7, 3, 1),
            new Vertex(10, 2, 2),
            new Vertex(11, 3, 2),
            null,
        ),
      ]));
    });
  });
});
