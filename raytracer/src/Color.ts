export default class Color {
  public r: number;
  public g: number;
  public b: number;

  static readonly WHITE = new Color(0xff, 0xff, 0xff);
  static readonly BLACK = new Color(0, 0, 0);

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public add(value: Color | number): Color {
    if (typeof(value) === 'number') {
      this.r += value;
      this.g += value;
      this.b += value;
    } else {
      this.r += value.r;
      this.g += value.g;
      this.b += value.b;
    }
    return this;
  }

  public sub(value: Color | number): Color {
    if (typeof(value) === 'number') {
      this.r -= value;
      this.g -= value;
      this.b -= value;
    } else {
      this.r -= value.r;
      this.g -= value.g;
      this.b -= value.b;
    }
    return this;
  }

  public mul(value: Color | number): Color {
    if (typeof(value) === 'number') {
      this.r *= value;
      this.g *= value;
      this.b *= value;
    } else {
      this.r *= value.r;
      this.g *= value.g;
      this.b *= value.b;
    }
    return this;
  }

  public div(value: Color | number): Color {
    if (typeof(value) === 'number') {
      this.r /= value;
      this.g /= value;
      this.b /= value;
    } else {
      this.r /= value.r;
      this.g /= value.g;
      this.b /= value.b;
    }
    return this;
  }

  public sqrt(): Color {
    this.r = Math.sqrt(this.r);
    this.g = Math.sqrt(this.g);
    this.b = Math.sqrt(this.b);
    return this;
  }

  public dot(color: Color = this): number {
    return (this.r * color.r + this.g * color.g + this.b * color.b);
  }

  public magnitude(): number {
    return Math.sqrt(this.dot());
  }

  public clone(): Color {
    return new Color(this.r, this.g, this.b);
  }
}
