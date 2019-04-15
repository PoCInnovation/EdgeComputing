import Vector from './vector';
import Color from './color';

export default class Pixel {
  public readonly position: Vector;
  public readonly color: Color;

  constructor(position: Vector, color: Color) {
    this.position = position;
    this.color = color;
  }

  add(value: Pixel | number) : Pixel {
    if (typeof(value) == 'number') {
      this.position.add(value);
      this.color.add(value);
    } else {
      this.position.add(value.position);
      this.color.add(value.color);
    }
    return this;
  }

  sub(value: Pixel | number) : Pixel {
    if (typeof(value) == 'number') {
      this.position.add(value);
      this.color.add(value);
    } else {
      this.position.add(value.position);
      this.color.add(value.color);
    }
    return this;
  }

  mul(value: Pixel | number) : Pixel {
    if (typeof(value) == 'number') {
      this.position.add(value);
      this.color.add(value);
    } else {
      this.position.add(value.position);
      this.color.add(value.color);
    }
    return this;
  }
  
  div(value: Pixel | number) : Pixel {
    if (typeof(value) == 'number') {
      this.position.add(value);
      this.color.add(value);
    } else {
      this.position.add(value.position);
      this.color.add(value.color);
    }
    return this;
  }
}