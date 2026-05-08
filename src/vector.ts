export class Vector {
	constructor(
		public x = 0,
		public y = 0
	) {}

	static circle(angle: number, dist = 1) {
		return new Vector(Math.cos(angle) * dist, Math.sin(angle) * dist);
	}

	add(other: Vector) {
		this.x += other.x;
		this.y += other.y;
	}

	sub(other: Vector) {
		this.x -= other.x;
		this.y -= other.y;
	}

	addVal(other: number) {
		this.x += other;
		this.y += other;
	}

	mulVal(other: number) {
		this.x *= other;
		this.y *= other;
	}

	divideVal(other: number) {
		this.x /= other;
		this.y /= other;
		return this;
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	clone() {
		return new Vector(this.x, this.y);
	}
}
