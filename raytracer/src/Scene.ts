import Color from './Color';
import Pixel from './Pixel';
import Vector from './Vector';
import Ray from './Ray';

export default class Scene {
  public readonly width: number;
  public readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public hitSphere(center: Vector, radius: number, r: Ray): number {
    const { x, y, z } = r.origin.position;
    const oc = new Vector(x, y, z).sub(center);
    const a = r.direction.position.dot();
    const b = 2 * oc.dot(r.direction.position);
    const c = oc.dot() - Math.pow(radius, 2);
    const discriminant = Math.pow(b, 2) - 4 * a * c;

    if (discriminant < 0) {
      return -1;
    }
    return (-b - Math.sqrt(discriminant)) / (2 * a);
  }

  public getPixel(ray: Ray) : Vector {
    const hitSphere = this.hitSphere(new Vector(0, 0, -1), 0.5, ray);
    if (hitSphere > 0) {
      const unit = Vector.unitVector(ray.pointAtParameter(hitSphere).position
        .sub(new Vector(0, 0, -1)));
      return new Vector(unit.x + 1, unit.y + 1, unit.z + 1).mul(0.5);
    }

    const t = 0.5 * (Vector.unitVector(ray.direction.position).y + 1);

    return new Vector(1, 1, 1)
      .mul(1 - t)
      .add(new Vector(0.5, 0.7, 1).mul(t));
  }

  public render(context: CanvasRenderingContext2D) {
    const color = new Color(0, 0, 0);
    const origin = new Pixel(new Vector(0, 0, 0), new Color(0, 0, 0));

    for (let y = this.height - 1; y >= 0; y -= 1) {
      for (let x = 0; x < this.width; x += 1) {
        const horizontal = new Vector(4, 0, 0);
        const vertical = new Vector(0, 2, 0);
        const lowerLeftCorner = new Pixel(new Vector(-2, -1, -1), new Color(-2, -1, -1));

        const ray = new Ray(origin, lowerLeftCorner
          .add(horizontal.mul(x / this.width))
          .add(vertical.mul(y / this.height)));
        const col = this.getPixel(ray);

        color.r = 0xff * col.x;
        color.g = 0xff * col.y;
        color.b = 0xff * col.z;

        context.fillStyle = color.toString();
        context.fillRect(x, this.height - y, 1, 1);
      }
    }
  }
}
