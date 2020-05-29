import {Vertex} from '@src/app/models/vertex';

export class SearchVertex {
  constructor(
      public self: Vertex,
      public neighbors: SearchVertex[],
      public seen: boolean,
  ) {
  }

  public static fromVertex(vertex: Vertex): SearchVertex {
    return new SearchVertex(
        vertex,
        [],
        false,
    );
  }
}
