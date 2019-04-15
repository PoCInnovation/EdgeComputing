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
    const b = oc.dot(r.direction.position) << 1;
    const c = oc.dot() - Math.pow(radius, 2);
    const discriminant = Math.pow(b, 2) - 4 * a * c;

    if (discriminant < 0) {
      return -1;
    }
    return (-b - Math.sqrt(discriminant)) / (a << 1);
  }

  public getColor(ray: Ray) : Vector {
    const hitSphere = this.hitSphere(new Vector(0, 0, -1), 0.5, ray);

    if (hitSphere > 0) {
      const unit = Vector.unitVector(ray.pointAtParameter(hitSphere).position
        .sub(new Vector(0, 0, -1)));
      return new Vector(unit.x + 1, unit.y + 1, unit.z + 1).mul(0.5);
    }

    const t = 0.5 * (Vector.unitVector(ray.direction.position).y + 1);

    return new Vector(1, 1, 1).mul(1 - t).add(new Vector(0.5, 0.7, 1).mul(t));
  }

  public render(context: CanvasRenderingContext2D) {
    const imageData = context.createImageData(this.width, this.height);
    const origin = new Vector(0, 0, 0);

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const lowerLeftCorner = new Vector(-2, -1, -1);
        const ray = new Ray(origin, lowerLeftCorner
          .add(new Vector(4, 0, 0).mul(x / this.width))
          .add(new Vector(0, 2, 0).mul(y / this.height)));
        const col = this.getColor(ray);
        const pos = (x << 2) + ((this.height - y) * imageData.width << 2);

        imageData.data[pos] = 0xff * col.x;
        imageData.data[pos + 1] = 0xff * col.y;
        imageData.data[pos + 2] = 0xff * col.z;
        imageData.data[pos + 3] = 0xff;
      }
    }
    context.putImageData(imageData, 0, 0);
  }
}
