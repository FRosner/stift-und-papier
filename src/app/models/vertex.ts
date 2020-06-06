export interface Vertex {
  id: number;
  x: number;
  y: number;
}

export const Vertex = {
  create: (id: number, x: number, y: number) => <Vertex>{
    id: id,
    x: x,
    y: y,
  },
};
