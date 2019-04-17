import { Material } from '../Materials/Material';
import { Shape, ShapeHit } from './Shape';
import Vector from '../Vector';
import Ray from '../Ray';

export default class Sphere extends Shape {
  public radius: number;

  constructor(position: Vector, material: Material, radius: number) {
    super(position, material);
    this.radius = radius;
  }

  public hit(ray: Ray, min: number, max: number): ShapeHit | undefined {
    const oc = ray.origin.clone().sub(this.position);
    const a = ray.direction.dot();
    const b = oc.dot(ray.direction);
    const c = oc.dot() - Math.pow(this.radius, 2);
    const delta = Math.pow(b, 2) - a * c;

    if (delta > 0) {
      let solution = (-b - Math.sqrt(delta)) / a;

      if (solution > min && solution < max) {
        return {
          t: solution,
          p: ray.pointAtParameter(solution),
          normal: ray.pointAtParameter(solution).sub(this.position).div(this.radius),
        };
      }
      solution = (-b + Math.sqrt(delta)) / a;
      if (solution > min && solution < max) {
        return {
          t: solution,
          p: ray.pointAtParameter(solution),
          normal: ray.pointAtParameter(solution).sub(this.position).div(this.radius),
        };
      }
    }
    return undefined;
  }
}
