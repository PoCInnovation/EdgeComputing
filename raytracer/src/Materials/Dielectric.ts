import { Material, MaterialHit } from './Material';
import { ShapeHit } from '../Shapes/Shape';
import Color from '../Color';
import Ray from '../Ray';

export default class Dielectric extends Material {

  private readonly refIdx: number;

  constructor(ri: number) {
    super(new Color(0, 0, 0));
    this.refIdx = ri;
  }

  public schlick(cosin: number): number {
    const r0 = Math.pow((1 - this.refIdx) / (1 + this.refIdx), 2);
    return r0 + (1 - r0) * Math.pow(1 - cosin, 5);
  }

  public scatter(ray: Ray, hit: ShapeHit): MaterialHit | undefined {
    const materialHit: MaterialHit = {
      refracted: true,
      attenuation: new Color(1, 1, 1),
      scattered: ray,
    };
    const reflected = ray.direction.reflect(hit.normal);
    const outwardNormal = hit.normal.clone();
    let cosin = ray.direction.dot(hit.normal) * -1 / ray.direction.magnitude();
    let niOverNt = 1 / this.refIdx;
    let reflectProbe = 1;

    if (ray.direction.dot(hit.normal) > 0) {
      outwardNormal.mul(-1);
      niOverNt = this.refIdx;
      cosin = this.refIdx * ray.direction.dot(hit.normal) / ray.direction.magnitude();
    }

    const refracted = ray.direction.refraction(outwardNormal, niOverNt);

    if (refracted !== undefined) {
      reflectProbe = this.schlick(cosin);
    }

    if (Math.random() < reflectProbe) {
      materialHit.scattered = new Ray(hit.p, reflected);
    } else if (refracted !== undefined) {
      materialHit.scattered = new Ray(hit.p, refracted);
    }

    return materialHit;
  }
}
