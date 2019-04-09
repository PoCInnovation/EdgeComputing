export default class Vector {
  constructor(public x: number, public y: number, public z: number) {}

  static dot(first: Vector, second: Vector): number {
    return (first.x * second.x + first.y * second.y + first.z * second.z);
  }

  static add(first: Vector, second: Vector): Vector {
    return new Vector(first.x + second.x, first.y + second.y, first.z + second.z);
  }

  static sub(first: Vector, second: Vector): Vector {
    return new Vector(first.x - second.x, first.y - second.y, first.z - second.z);
  }

  static scale(vector: Vector, ratio: number): Vector {
    return new Vector(vector.x * ratio, vector.y * ratio, vector.z * ratio);
  }

  static unit(vector: Vector) {
    return Vector.scale(vector, 1 / Vector.magnitude(vector));
  }

  static crossProduct(first: Vector, second: Vector): Vector {
    return new Vector(first.y * second.z - first.z * second.y,
                      first.z * second.x - first.x * second.z,
                      first.x * second.y - first.y * second.x);
  }

  static magnitude(vector: Vector): number {
    return Math.sqrt(Vector.dot(vector, vector));
  }
}
