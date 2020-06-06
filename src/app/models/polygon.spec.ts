import {Vertex} from '@src/app/models/vertex';
import {Polygon} from '@src/app/models/polygon';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';

describe('Polygon', () => {
  describe('fromPath', () => {
    it('should create a polygon', () => {
      const path: Vertex[] = [
        Vertex.create(0, 0, 0),
        Vertex.create(1, 1, 0),
        Vertex.create(2, 0, 1),
        Vertex.create(3, 1, 1),
      ];

      expect(Polygon.fromPath(path)).toEqual(
          new Polygon([
            Edge.initialize(path[0], path[1]),
            Edge.initialize(path[1], path[2]),
            Edge.initialize(path[2], path[3]),
            Edge.initialize(path[3], path[0]),
          ]),
      );
    });

    it('should throw an exception if created from a path with fewer than 4 vertices', () => {
      const path: Vertex[] = [
        Vertex.create(0, 0, 0),
        Vertex.create(1, 1, 0),
        Vertex.create(2, 0, 1),
      ];

      expect(() => Polygon.fromPath(path)).toThrowError();
    });
  });

  describe('contains', () => {
    /*
        A-----B
        |     |
        |  x~~+~~
        |     |
        C-----D
    */
    it('should return true if the square lies within a simple polygon', () => {
      const A = Vertex.create(0, 0, 0);
      const B = Vertex.create(1, 1, 0);
      const C = Vertex.create(2, 0, 1);
      const D = Vertex.create(3, 1, 1);
      const polygon = Polygon.fromPath([A, B, D, C]);
      const square = Square.create(A, B, C, D, null);
      expect(polygon.contains(square)).toEqual(true);
    });

    /*
        A-----B-----C-----D
        |                 |
        |                 |
        |                 |
        L     I-----H     E
        |     |     |     |
        |  x~~+~~~~~+~~~~~+~~
        |     |     |     |
        K-----J     G-----F
    */
    it('should return true if the square within a complex polygon such that the ray intersects more than once', () => {
      const A = Vertex.create(0, 0, 0);
      const B = Vertex.create(1, 1, 0);
      const C = Vertex.create(2, 2, 0);
      const D = Vertex.create(3, 3, 0);
      const E = Vertex.create(4, 3, 1);
      const F = Vertex.create(5, 3, 2);
      const G = Vertex.create(6, 2, 2);
      const H = Vertex.create(7, 2, 1);
      const I = Vertex.create(8, 1, 1);
      const J = Vertex.create(9, 1, 2);
      const K = Vertex.create(10, 0, 2);
      const L = Vertex.create(11, 0, 1);
      const polygon = Polygon.fromPath([A, B, C, D, E, F, G, H, I, J, K, L]);
      const square = Square.create(L, I, K, J, null);
      expect(polygon.contains(square)).toEqual(true);

    });

    /*
        A     B

           x~~~~~~

        C-----D
        |     |
        |     |
        |     |
        E-----F
    */
    it('should return false if the square lies above the polygon', () => {
      const A = Vertex.create(0, 0, 0);
      const B = Vertex.create(1, 1, 0);
      const C = Vertex.create(2, 0, 1);
      const D = Vertex.create(3, 1, 1);
      const E = Vertex.create(4, 0, 2);
      const F = Vertex.create(5, 1, 2);
      const polygon = Polygon.fromPath([C, D, F, E]);
      const square = Square.create(A, B, C, D, null);
      expect(polygon.contains(square)).toEqual(false);
    });

    /*
        A-----B
        |     |
        |     |
        |     |
        C-----D

           x~~~~~~

        E     F
    */
    it('should return false if the square lies below the polygon', () => {
      const A = Vertex.create(0, 0, 0);
      const B = Vertex.create(1, 1, 0);
      const C = Vertex.create(2, 0, 1);
      const D = Vertex.create(3, 1, 1);
      const E = Vertex.create(4, 0, 2);
      const F = Vertex.create(5, 1, 2);
      const polygon = Polygon.fromPath([A, B, C, D]);
      const square = Square.create(C, D, E, F, null);
      expect(polygon.contains(square)).toEqual(false);
    });

    /*
      A     B-----C
            |     |
         x~~+~~~~~+~~~
            |     |
      D     E-----F
    */
    it('should return false if the square lies left of the polygon', () => {
      const A = Vertex.create(0, 0, 0);
      const B = Vertex.create(1, 1, 0);
      const C = Vertex.create(2, 2, 0);
      const D = Vertex.create(3, 0, 1);
      const E = Vertex.create(4, 1, 1);
      const F = Vertex.create(5, 2, 1);
      const polygon = Polygon.fromPath([B, C, F, E]);
      const square = Square.create(A, B, D, E, null);
      expect(polygon.contains(square)).toEqual(false);
    });

    /*
        A-----B     C
        |     |
        |     |  x~~~~~~
        |     |
        D-----E     F
    */
    it('should return false if the square lies right of the polygon', () => {
      const A = Vertex.create(0, 0, 0);
      const B = Vertex.create(1, 1, 0);
      const C = Vertex.create(2, 2, 0);
      const D = Vertex.create(3, 0, 1);
      const E = Vertex.create(4, 1, 1);
      const F = Vertex.create(5, 2, 1);
      const polygon = Polygon.fromPath([A, B, E, D]);
      const square = Square.create(B, C, E, F, null);
      expect(polygon.contains(square)).toEqual(false);
    });
  });
});
