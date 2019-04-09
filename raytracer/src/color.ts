export default class Color {
  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}