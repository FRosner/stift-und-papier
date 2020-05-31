import {Vertex} from '@src/app/models/vertex';
import {Polygon} from '@src/app/models/polygon';
import {Edge} from '@src/app/models/edge';
import {Square} from '@src/app/models/square';

describe('Polygon', () => {
  describe('fromPath', () => {
    it('should create a polygon', () => {
      const path: Vertex[] = [
        new Vertex(0, 0, 0),
        new Vertex(1, 1, 0),
        new Vertex(2, 0, 1),
        new Vertex(3, 1, 1),
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
        new Vertex(0, 0, 0),
        new Vertex(1, 1, 0),
        new Vertex(2, 0, 1),
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
      const A = new Vertex(0, 0, 0);
      const B = new Vertex(1, 1, 0);
      const C = new Vertex(2, 0, 1);
      const D = new Vertex(3, 1, 1);
      const polygon = Polygon.fromPath([A, B, D, C]);
      const square = new Square(A, B, C, D, null);
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
      const A = new Vertex(0, 0, 0);
      const B = new Vertex(1, 1, 0);
      const C = new Vertex(2, 2, 0);
      const D = new Vertex(3, 3, 0);
      const E = new Vertex(4, 3, 1);
      const F = new Vertex(5, 3, 2);
      const G = new Vertex(6, 2, 2);
      const H = new Vertex(7, 2, 1);
      const I = new Vertex(8, 1, 1);
      const J = new Vertex(9, 1, 2);
      const K = new Vertex(10, 0, 2);
      const L = new Vertex(11, 0, 1);
      const polygon = Polygon.fromPath([A, B, C, D, E, F, G, H, I, J, K, L]);
      const square = new Square(L, I, K, J, null);
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
      const A = new Vertex(0, 0, 0);
      const B = new Vertex(1, 1, 0);
      const C = new Vertex(2, 0, 1);
      const D = new Vertex(3, 1, 1);
      const E = new Vertex(4, 0, 2);
      const F = new Vertex(5, 1, 2);
      const polygon = Polygon.fromPath([C, D, F, E]);
      const square = new Square(A, B, C, D, null);
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
      const A = new Vertex(0, 0, 0);
      const B = new Vertex(1, 1, 0);
      const C = new Vertex(2, 0, 1);
      const D = new Vertex(3, 1, 1);
      const E = new Vertex(4, 0, 2);
      const F = new Vertex(5, 1, 2);
      const polygon = Polygon.fromPath([A, B, C, D]);
      const square = new Square(C, D, E, F, null);
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
      const A = new Vertex(0, 0, 0);
      const B = new Vertex(1, 1, 0);
      const C = new Vertex(2, 2, 0);
      const D = new Vertex(3, 0, 1);
      const E = new Vertex(4, 1, 1);
      const F = new Vertex(5, 2, 1);
      const polygon = Polygon.fromPath([B, C, F, E]);
      const square = new Square(A, B, D, E, null);
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
      const A = new Vertex(0, 0, 0);
      const B = new Vertex(1, 1, 0);
      const C = new Vertex(2, 2, 0);
      const D = new Vertex(3, 0, 1);
      const E = new Vertex(4, 1, 1);
      const F = new Vertex(5, 2, 1);
      const polygon = Polygon.fromPath([A, B, E, D]);
      const square = new Square(B, C, E, F, null);
      expect(polygon.contains(square)).toEqual(false);
    });
  });
});
