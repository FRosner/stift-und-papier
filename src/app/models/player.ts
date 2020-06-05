export class Player {
  constructor(public id: number, public name: string, public color: string, public score: number) {
  }

  public serialize() {
    return {
      ...this,
    };
  }
}
