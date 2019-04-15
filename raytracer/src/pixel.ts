import Vector from './vector';
import Color from './color';
import { type } from 'os';

export default class Pixel {
  public readonly position: Vector;
  public readonly color: Color;

  constructor(position: Vector, color: Color) {
    this.position = position;
    this.color = color;
  }

  add(value: Pixel | Vector | number) : Pixel {
    if (typeof(value) === 'number') {
      this.position.add(value);
      this.color.add(value);
    } else if (value instanceof Pixel) {
      this.position.add(value.position);
      this.color.add(value.color);
    } else {
      this.position.add(value);
      this.color.add(new Color(value.x, value.y, value.z));
    }
    return this;
  }

  sub(value: Pixel | Vector | number) : Pixel {
    if (typeof(value) === 'number') {
      this.position.add(value);
      this.color.add(value);
    } else if (value instanceof Pixel) {
      this.position.add(value.position);
      this.color.add(value.color);
    } else {
      this.position.sub(value);
      this.color.sub(new Color(value.x, value.y, value.z));
    }
    return this;
  }

  mul(value: Pixel | Vector | number) : Pixel {
    if (typeof(value) === 'number') {
      this.position.add(value);
      this.color.add(value);
    } else if (value instanceof Pixel) {
      this.position.add(value.position);
      this.color.add(value.color);
    } else {
      this.position.mul(value);
      this.color.mul(new Color(value.x, value.y, value.z));
    }
    return this;
  }

  div(value: Pixel | Vector | number) : Pixel {
    if (typeof(value) === 'number') {
      this.position.add(value);
      this.color.add(value);
    } else if (value instanceof Pixel) {
      this.position.add(value.position);
      this.color.add(value.color);
    } else {
      this.position.div(value);
      this.color.div(new Color(value.x, value.y, value.z));
    }
    return this;
  }
}
