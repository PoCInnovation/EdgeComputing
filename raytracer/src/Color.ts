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

  sub(value: Color | number) : Color {
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

  mul(value: Color | number) : Color {
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

  div(value: Color | number) : Color {
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

  public toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  dot(): number {
    return (Math.pow(this.r, 2) + Math.pow(this.g, 2) + Math.pow(this.b, 2));
  }

  magnitude(): number {
    return Math.sqrt(this.dot());
  }
}
