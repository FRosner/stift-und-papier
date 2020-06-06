import {Player} from '@src/app/models/player';
import {Graph} from '@src/app/models/graph';
import {Vertex} from '@src/app/models/vertex';

export interface Square {
  topLeft: Vertex;
  topRight: Vertex;
  bottomLeft: Vertex;
  bottomRight: Vertex;
  owner: Player | null;
}

export const Square = {
  create: (topLeft: Vertex, topRight: Vertex, bottomLeft: Vertex, bottomRight: Vertex, owner: Player | null) => <Square>{
    topLeft: topLeft,
    topRight: topRight,
    bottomLeft: bottomLeft,
    bottomRight: bottomRight,
    owner: owner,
  },

  fromGraph: (graph: Graph) => {
    if (graph.xSize <= 1 || graph.ySize <= 1) {
      return [];
    }
    const squares: Square[] = [];
    for (let y = 0; y < graph.ySize - 1; y++) {
      for (let x = 0; x < graph.xSize - 1; x++) {
        const i = x + y * graph.xSize;
        squares.push(<Square>{
          topLeft: graph.vertices[i],
          topRight: graph.vertices[i + 1],
          bottomLeft: graph.vertices[i + graph.xSize],
          bottomRight: graph.vertices[i + graph.xSize + 1],
          owner: null,
        });
      }
    }
    return squares;
  },

  isOwned: (square: Square) => square.owner !== null,
};
