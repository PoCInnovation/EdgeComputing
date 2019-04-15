import Vector from './Vector';

export default class Camera {
  public readonly position: Vector;
  public readonly direction: Vector;
  public readonly fieldOfView: number;

  constructor(position: Vector, direction: Vector, fieldOfView: number) {
    this.position = position;
    this.direction = direction;
    this.fieldOfView = fieldOfView;
  }
}
