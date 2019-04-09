import Vector from './vector';
import Color from './color';

export default class Pixel {
  public readonly position: Vector;
  public readonly color: Color;

  constructor(position: Vector, color: Color) {
    this.position = position;
    this.color = color;
  }
}