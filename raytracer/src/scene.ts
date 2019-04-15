import Color from './color';
import Pixel from './pixel';
import Vector from './vector';
import Ray from './ray';

export default class Scene {
  public readonly width: number;
  public readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public hitSphere(center: Vector, radius: number, r: Ray): boolean {
    const { x, y, z } = r.origin.position;
    const oc = new Vector(x, y, z).sub(center);
    const a = r.direction.position.dot();
    const b = 2 * oc.dot(r.direction.position);
    const c = oc.dot() - radius * radius;

    return (b * b - 4 * a * c) > 0;
  }

  public getPixel(ray: Ray) : Vector {
    if (this.hitSphere(new Vector(0, 0, -1), 0.5, ray)) {
      return new Vector(1, 0, 0);
    }

    const t = 0.5 * (Vector.unitVector(ray.direction.position).y + 1);

    return new Vector(1, 1, 1)
      .mul(1 - t)
      .add(new Vector(0.5, 0.7, 1).mul(t));
  }

  public render(context: CanvasRenderingContext2D) {
    const color = new Color(0, 0, 0);
    const origin = new Pixel(new Vector(0, 0, 0), new Color(0, 0, 0));

    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height; y += 1) {
        const horizontal = new Vector(4, 0, 0);
        const vertical = new Vector(0, 2, 0);
        const lowerLeftCorner = new Pixel(new Vector(-2, -1, -1), new Color(-2, -1, -1));

        const ray = new Ray(origin, lowerLeftCorner
          .add(horizontal.mul(x / this.width))
          .add(vertical.mul(y / this.height)));
        const col = this.getPixel(ray);

        color.r = 255.99 * col.x;
        color.g = 255.99 * col.y;
        color.b = 255.99 * col.z;

        context.fillStyle = color.toString();
        context.fillRect(x, y, x + 1, y + 1);
      }
    }
  }
}
