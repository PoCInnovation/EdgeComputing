import { Material } from '../Materials/Material';
import Vector from '../Vector';
import Ray from '../Ray';

export interface ShapeHit {
  t: number;
  p: Vector;
  normal: Vector;
}

export class Shape {
  public position: Vector;
  public material: Material;

  constructor(position: Vector, material: Material) {
    this.position = position;
    this.material = material;
  }

  public hit(ray: Ray, min: number, max: number): ShapeHit | undefined {
    return undefined;
  }
}
