import Vector from './Vector';
import Ray from './Ray';

export default class Camera {
  public lowerLeftCorner: Vector;
  public horizontal: Vector;
  public vertical: Vector;
  public origin: Vector;
  private readonly lensRadius: number;
  private readonly time0: number;
  private readonly time1: number;

  constructor(lookFrom: Vector, lookAt: Vector, vUp: Vector, vfov: number,
              aspect: number, aperture: number, focusDist: number, t0: number, t1: number) {
    const halfHeight = Math.tan(vfov * Math.PI / 180 / 2);
    const halfWidth = aspect * halfHeight;
    const w = lookFrom.clone().sub(lookAt).unit();
    const u = vUp.cross(w).unit();
    const v = w.cross(u);

    this.origin = lookFrom;
    this.lensRadius = aperture / 2;
    this.lowerLeftCorner = this.origin.clone().sub(
      u.clone().mul(halfWidth * focusDist))
      .sub(v.clone().mul(halfHeight * focusDist))
      .sub(w.clone().mul(focusDist));
    this.horizontal = u.clone().mul(2 * halfWidth * focusDist);
    this.vertical = v.clone().mul(2 * halfHeight * focusDist);
    this.time0 = t0;
    this.time1 = t1;
  }

  public getRay(u: number, v: number): Ray {
    const rd = Vector.randomInUnitDisk().mul(this.lensRadius);
    const offset = u * rd.x + v * rd.y;
    const direction = this.lowerLeftCorner.clone()
      .add(this.horizontal.clone().mul(u))
      .add(this.vertical.clone().mul(v))
      .sub(this.origin)
      .sub(offset);
    const time = this.time0 + Math.random() * (this.time1 - this.time0);

    return new Ray(this.origin.clone().add(offset), direction, time);
  }
}
