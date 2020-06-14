import {Vertex} from '@src/app/models/vertex';
import {Player} from '@src/app/models/player';

export interface Edge {
  source: Vertex;
  target: Vertex;
  owner: Player | null;
}

export const Edge = {
      initialize: (source: Vertex, target: Vertex) => <Edge>{
        source: source,
        target: target,
        owner: null,
      },

      isOwned: (edge: Edge) => edge.owner !== null,

      hasSameCoordinates: (edgeA: Edge, edgeB: Edge) =>
          edgeA.source.id === edgeB.source.id && edgeA.target.id === edgeB.target.id,
    }
;
