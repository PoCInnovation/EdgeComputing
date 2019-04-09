import Vector from './vector';

export default class Camera {
  constructor(public position: Vector, public direction: Vector, public fieldOfView: number) {}
}
