import { Material, MaterialHit } from './Material';
import { ShapeHit } from '../Shapes/Shape';
import Vector from '../Vector';
import Color from '../Color';
import Ray from '../Ray';

export default class Metal extends Material {
  private readonly blur: number;

  constructor(reflection: Color, blur: number) {
    super(reflection, 'Metal');
    this.blur = blur;
  }

  public scatter(ray: Ray, hit: ShapeHit): MaterialHit | undefined {
    const reflect = ray.direction.unit().reflect(hit.normal);
    const scattered = new Ray(
      hit.p, reflect.add(Vector.randomInUnitSphere().mul(this.blur)), ray.time);

    if (scattered.direction.dot(hit.normal) > 0) {
      return {
        scattered,
        attenuation: this.reflection.clone(),
        refracted: false,
      };
    }
    return undefined;
  }
}
