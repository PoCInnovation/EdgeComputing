import Vector from './Vector';
import Color from './Color';

export default class Pixel {
  public readonly position: Vector;
  public readonly color: Color;

  constructor(position: Vector, color?: Color) {
    this.position = position;
    if (color == null) {
      this.color = new Color(position.x, position.y, position.z);
    } else {
      this.color = color;
    }
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
      this.position.sub(value);
      this.color.sub(value);
    } else if (value instanceof Pixel) {
      this.position.sub(value.position);
      this.color.sub(value.color);
    } else {
      this.position.sub(value);
      this.color.sub(new Color(value.x, value.y, value.z));
    }
    return this;
  }

  mul(value: Pixel | Vector | number) : Pixel {
    if (typeof(value) === 'number') {
      this.position.mul(value);
      this.color.mul(value);
    } else if (value instanceof Pixel) {
      this.position.mul(value.position);
      this.color.mul(value.color);
    } else {
      this.position.mul(value);
      this.color.mul(new Color(value.x, value.y, value.z));
    }
    return this;
  }

  div(value: Pixel | Vector | number) : Pixel {
    if (typeof(value) === 'number') {
      this.position.div(value);
      this.color.div(value);
    } else if (value instanceof Pixel) {
      this.position.div(value.position);
      this.color.div(value.color);
    } else {
      this.position.div(value);
      this.color.div(new Color(value.x, value.y, value.z));
    }
    return this;
  }
}
