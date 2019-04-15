export default class Color {
  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  add(value: Color | number) : Color {
    if (typeof(value) == 'number') {
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

  sub(value: Color | number) : Color {
    if (typeof(value) == 'number') {
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

  mul(value: Color | number) : Color {
    if (typeof(value) == 'number') {
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

  div(value: Color | number) : Color {
    if (typeof(value) == 'number') {
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

  public toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  dot(): number {
    return (this.r * this.r + this.g * this.g + this.b * this.b);
  }

  magnitude(): number {
    return Math.sqrt(this.dot());
  }
}
