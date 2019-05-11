import { ShapeHit } from '../Shapes/Shape';
import Color from '../Color';
import Ray from '../Ray';

export interface MaterialHit {
  refracted: boolean;
  attenuation: Color;
  scattered: Ray;
}

export class Material {
  private readonly name: string;
  public reflection: Color;

  constructor(reflection: Color, name: string = 'Lambertian') {
    this.name = name;
    this.reflection = reflection;
  }

  public scatter(ray: Ray, hit: ShapeHit): MaterialHit | undefined {
    return undefined;
  }
}
