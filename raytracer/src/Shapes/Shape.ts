import Color from '../Color';
import Vector from '../Vector';
import Ray from '../Ray';

export interface ShapeHit {
  t?: number;
  p?: Vector;
  normal?: Vector;
  visible: boolean;
}

interface IShape {
  position: Vector;
  color: Color;

  hit(ray: Ray, min: number, max: number): ShapeHit;
}

export class Shape implements IShape {
  public position: Vector;
  public color: Color;

  constructor(position: Vector, color: Color) {
    this.position = position;
    this.color = color;
  }

  hit(ray: Ray, min: number, max: number): ShapeHit {
    return { visible: false };
  }
}
