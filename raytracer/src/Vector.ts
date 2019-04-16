export default class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(value: Vector | number) : Vector {
    if (typeof(value) === 'number') {
      this.x += value;
      this.y += value;
      this.z += value;
    } else {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
    }
    return this;
  }

  public sub(value: Vector | number) : Vector {
    if (typeof(value) === 'number') {
      this.x -= value;
      this.y -= value;
      this.z -= value;
    } else {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
    }
    return this;
  }

  public mul(value: Vector | number) : Vector {
    if (typeof(value) === 'number') {
      this.x *= value;
      this.y *= value;
      this.z *= value;
    } else {
      this.x *= value.x;
      this.y *= value.y;
      this.z *= value.z;
    }
    return this;
  }

  public div(value: Vector | number) : Vector {
    if (typeof(value) === 'number') {
      this.x /= value;
      this.y /= value;
      this.z /= value;
    } else {
      this.x /= value.x;
      this.y /= value.y;
      this.z /= value.z;
    }
    return this;
  }

  public dot(vector: Vector = this): number {
    return (this.x * vector.x + this.y * vector.y + this.z * vector.z);
  }

  public magnitude(): number {
    return Math.sqrt(this.dot());
  }

  public clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  public static unitVector(vector: Vector): Vector {
    return vector.clone().div(vector.magnitude());
  }
}
