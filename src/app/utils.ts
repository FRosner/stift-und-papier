export class Utils {
  public static flatMap<I, O>(xs: I[], f: (I, number) => O[]): O[] {
    return xs.map(f).reduce((x, y) => x.concat(y), []);
  }
}
