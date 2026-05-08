import { darker } from './color';
import { game } from './game';
import global from './global';
import { mouse } from './mouse';
import { formatNumber } from './number';
import { getShape, ShapeType, typeSizes } from './shapeTypes';
import { Vector } from './vector';

export const drawShape = function (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	size: number,
	angle: number,
	sides: number
) {
	const scale = game.scale * game.room.fov;
	ctx.beginPath();
	if (sides == 0) {
		ctx.arc(x * scale, y * scale, size * scale, 0, Math.PI * 2);
	} else {
		const delta = (Math.PI * 2) / sides;
		for (let i = 0; i < sides; ++i) {
			ctx.lineTo(
				(x + Math.cos(angle + i * delta) * size) * scale,
				(y + Math.sin(angle + i * delta) * size) * scale
			);
		}
	}
	ctx.closePath();
};

export class Shape {
	angle = Math.random() * Math.PI * 2;
	velocity = new Vector();
	fillStyle = '#000';
	strokeStyle = '#000';
	sides = 0;
	size = 10;
	drawSize = 1;
	layers = 1;
	score = 0;
	evoTime = 0;
	type = 0;
	health = 1;

	constructor(public pos: Vector) {}

	static random() {
		const shape = new Shape(
			new Vector(
				game.room.minX + Math.random() * game.room.maxX,
				game.room.minY + Math.random() * game.room.maxY
			)
		);
		shape.layers = 1;
		//1 + Math.floor(Math.pow(Math.random(), 3) * global.layersBuff);
		shape.setType(
			getShape(
				Math.pow(Math.random(), 2) * global.shapeTypeBuff,
				Math.pow(Math.random(), 5) * global.shapeRarityBuff,
				shape.layers
			)
		);
		shape.setEvoTime();
		return shape;
	}

	setType(type: ShapeType) {
		this.fillStyle = type.color;
		this.strokeStyle = darker(type.color);
		this.sides = type.sides;
		this.size = type.size;
		this.score = type.score;
		this.type = type.type;
		this.health = type.type + 1;
		const realShape = Math.max(3, this.sides);
		const downscale = Math.cos(Math.PI / realShape);
		const scale =
			this.sides == 3 ? (this.layers > 1 ? 2 / (2 + (this.layers - 1)) : 1) : 1;
		this.size /= Math.pow(downscale, this.layers - 1);
		this.size *= scale;
	}

	evolve() {
		this.layers += 1;
		this.score *= 5;
		const realShape = Math.max(3, this.sides);
		const downscale = Math.cos(Math.PI / realShape);
		this.size = typeSizes[this.type];
		const scale =
			this.sides == 3 ? (this.layers > 1 ? 2 / (2 + (this.layers - 1)) : 1) : 1;
		this.size /= Math.pow(downscale, this.layers - 1);
		this.size *= scale;
		this.setEvoTime();
	}

	setEvoTime() {
		this.evoTime =
			performance.now() +
			(this.layers * (1 + this.type) * 10000 * (0.5 + Math.random())) /
				global.shapeEvoNerf[this.type];
	}

	update() {
		if (
			this.layers < global.layersCaps[this.type] &&
			performance.now() > this.evoTime
		) {
			this.evolve();
		}

		this.drawSize = this.drawSize * 0.95 + this.size * 0.05;

		if (mouse.leftClick || mouse.right) {
			const scale = game.scale * game.room.fov;
			const dx = mouse.x - this.pos.x * scale;
			const dy = mouse.y - this.pos.y * scale;
			const power =
				(mouse.leftClick ? 10 : 100) +
				this.size * scale -
				Math.sqrt(dx * dx + dy * dy);
			if (power > 0) {
				if (mouse.leftClick) {
					this.health -= global.clickDamage;
					if (this.isDead()) {
						global.score += this.score;
						game.flyingText.push({
							x: this.pos.x * scale,
							y: this.pos.y * scale,
							alpha: 1,
							text: '+' + formatNumber(this.score)
						});
					}
				} else {
					const angle = Math.atan2(dy, dx);
					const force = Vector.circle(angle, power / 100);
					this.velocity.sub(force);
				}
			}
		}

		const force = game.room.applyForce(this.pos, this.size, 0.001);
		this.velocity.add(force);
		this.velocity.add(
			Vector.circle(this.angle + 1, 1 / 30 / Math.sqrt(this.size))
		);
		this.evoTime -= this.velocity.length() * 10;
		this.angle += (0.1 + this.velocity.length()) / 150;
		this.pos.add(this.velocity);
		this.velocity.mulVal(0.98);
	}

	render(ctx: CanvasRenderingContext2D) {
		const realShape = Math.max(3, this.sides);
		const downscale = Math.cos(Math.PI / realShape);
		ctx.fillStyle = darker(this.fillStyle, (this.health + 1) / (this.type + 2));
		ctx.strokeStyle = darker(
			this.strokeStyle,
			(this.health + 1) / (this.type + 2)
		);
		ctx.lineWidth = 3 * game.scale * game.room.fov;
		for (let i = 0; i < this.layers; ++i) {
			drawShape(
				ctx,
				this.pos.x,
				this.pos.y,
				this.drawSize * Math.pow(downscale, i),
				this.angle + (!(i & 1) ? Math.PI / realShape : 0),
				this.sides
			);
			ctx.fill();
			ctx.stroke();
		}
	}

	collide(other: Shape) {
		const dx = other.pos.x - this.pos.x;
		const dy = other.pos.y - this.pos.y;
		const power = this.size + other.size - Math.sqrt(dx * dx + dy * dy);
		if (power < 0) {
			return;
		}
		const angle = Math.atan2(dy, dx);
		const thisMass = this.size;
		const otherMass = other.size;
		this.pos.sub(Vector.circle(angle, power).divideVal(thisMass));
		other.pos.add(Vector.circle(angle, power).divideVal(otherMass));
	}

	isDead() {
		return this.health <= 0;
	}
}
