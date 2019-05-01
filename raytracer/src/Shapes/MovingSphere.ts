import { Shape, ShapeHit } from './Shape';
import Vector from '../Vector';
import { Material } from '../Materials/Material';
import Ray from '../Ray';

export default class MovingSphere extends Shape {
  private readonly center0: Vector;
  private readonly center1: Vector;
  private readonly time0: number;
  private readonly time1: number;
  private readonly radius: number;

  constructor(cen0: Vector, cen1: Vector, t0: number, t1: number, r: number, material: Material) {
    super(cen0, material);
    this.center0 = cen0;
    this.center1 = cen1;
    this.time0 = t0;
    this.time1 = t1;
    this.radius = r;
  }

  public center(time: number): Vector {
    return this.center1.clone()
      .sub(this.center0)
      .mul((time - this.time0) / (this.time1 - this.time0))
      .add(this.center0);
  }

  public hit(ray: Ray, tmin: number, tmax: number): ShapeHit | undefined {
    const oc = ray.origin.clone().sub(this.center(ray.time));
    const a = ray.direction.dot(ray.direction);
    const b = oc.dot(ray.direction);
    const c = oc.dot(oc) - this.radius * this.radius;
    const delta = b * b - a * c;

    if (delta > 0) {
      let solution = (-b - Math.sqrt(delta)) / a;

      if (solution < tmax && solution > tmin) {
        return {
          t: solution,
          p: ray.pointAtParameter(solution),
          normal: ray.pointAtParameter(solution).sub(this.center(ray.time)).div(this.radius),
        };
      }
      solution = (-b + Math.sqrt(delta)) / a;
      if (solution > tmin && solution < tmax) {
        return {
          t: solution,
          p: ray.pointAtParameter(solution),
          normal: ray.pointAtParameter(solution).sub(this.center(ray.time)).div(this.radius),
        };
      }
    }
    return undefined;
  }
}
