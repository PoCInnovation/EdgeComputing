import { ShapeHit } from '../Shapes/Shape';
import Color from '../Color';
import Ray from '../Ray';

export interface MaterialHit {
  refracted: boolean;
  attenuation: Color;
  scattered: Ray;
}

export class Material {
  public reflection: Color;

  constructor(reflection: Color) {
    this.reflection = reflection;
  }

  public scatter(ray: Ray, hit: ShapeHit): MaterialHit | undefined {
    return undefined;
  }
}
