export interface Player {
  id: number;
  name: string;
  color: string;
  score: number;
}

export const Player = {
  create: (id: number, name: string, color: string, score: number) => <Player>{
    id: id,
    name: name,
    color: color,
    score: score,
  },
};
