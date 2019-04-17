import { Shape, ShapeHit } from './Shape';
import Color from '../Color';
import Vector from '../Vector';
import Ray from '../Ray';

export default class Sphere extends Shape {
  public radius: number;

  constructor(position: Vector, color: Color, radius: number) {
    super(position, color);
    this.radius = radius;
  }

  public hit(ray: Ray, min: number, max: number): ShapeHit {
    const oc = ray.origin.clone().sub(this.position);
    const a = ray.direction.dot();
    const b = oc.dot(ray.direction);
    const c = oc.dot() - Math.pow(this.radius, 2);
    const delta = Math.pow(b, 2) - a * c;
    const obj: ShapeHit = { visible: false };

    if (delta > 0) {
      let solution = (-b - Math.sqrt(delta)) / a;

      if (solution > min && solution < max) {
        obj.t = solution;
        obj.p = ray.pointAtParameter(solution);
        obj.normal = obj.p.clone().sub(this.position).div(this.radius);
        obj.visible = true;
        return obj;
      }
      solution = (-b + Math.sqrt(delta)) / a;
      if (solution > min && solution < max) {
        obj.t = solution;
        obj.p = ray.pointAtParameter(solution);
        obj.normal = obj.p.clone().sub(this.position).div(this.radius);
        obj.visible = true;
        return obj;
      }
    }
    return obj;
  }
}
