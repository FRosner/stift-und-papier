import {Vertex} from '@src/app/models/vertex';
import {Player} from '@src/app/models/player';

export class Edge {
  constructor(
      public source: Vertex,
      public target: Vertex,
      public owner: Player | null,
  ) {
  }

  public static initialize(source: Vertex, target: Vertex): Edge {
    return new Edge(source, target, null);
  }

  public static isOwned(edge: Edge): boolean {
    return edge.owner !== null;
  }

  public serialize() {
    return {
      ...this,
      source: this.source.serialize(),
      target: this.target.serialize(),
      owner: this.owner && this.owner.serialize(),
    };
  }


}
