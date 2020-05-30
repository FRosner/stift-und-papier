import {Vertex} from '@src/app/models/vertex';
import {Polygon} from '@src/app/models/polygon';
import {Edge} from '@src/app/models/edge';

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
});
