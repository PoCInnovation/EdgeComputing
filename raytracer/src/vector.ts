export default class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(value: Vector | number) {
    if (typeof(value) == 'number') {
      this.x += value;
      this.y += value;
      this.z += value;
    } else {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
    }
  }

  sub(value: Vector | number) {
    if (typeof(value) == 'number') {
      this.x -= value;
      this.y -= value;
      this.z -= value;
    } else {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
    }
  }

  mul(value: Vector | number) {
    if (typeof(value) == 'number') {
      this.x *= value;
      this.y *= value;
      this.z *= value;
    } else {
      this.x *= value.x;
      this.y *= value.y;
      this.z *= value.z;
    }
  }
  
  div(value: Vector | number) {
    if (typeof(value) == 'number') {
      this.x /= value;
      this.y /= value;
      this.z /= value;
    } else {
      this.x /= value.x;
      this.y /= value.y;
      this.z /= value.z;
    }
  }

  scale(ratio: number) {
    this.x *= ratio;
    this.y *= ratio;
    this.z *= ratio;
  }

  unit() {
    this.scale(1 / this.magnitude());
  }

  dot(): number {
    return (this.x * this.x + this.y * this.y + this.z * this.z);
  }

  magnitude(): number {
    return Math.sqrt(this.dot());
  }
}
