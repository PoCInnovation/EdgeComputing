import { Material, MaterialHit } from './Material';
import { ShapeHit } from '../Shapes/Shape';
import Vector from '../Vector';
import Ray from '../Ray';

export default class Lambertian extends Material {
  public scatter(ray: Ray, hit: ShapeHit): MaterialHit {
    const target = hit.p.clone().add(hit.normal).add(Vector.randomInUnitSphere());

    return {
      attenuation: this.reflection.clone(),
      scattered: new Ray(hit.p, target.sub(hit.p)),
      refracted: false,
    };
  }
}
