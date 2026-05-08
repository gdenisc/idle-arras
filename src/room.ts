import { game } from './game';
import global from './global';
import { Vector } from './vector';

export class Room {
	minX = 120;
	minY = 120;
	maxX = 1080 - 240;
	maxY = 1080 - 240;
	fov = 2;

	update() {
		this.minX = 120;
		this.minY = 120;
		this.maxX = 1080 / this.fov - 240;
		this.maxY = 1080 / this.fov - 240;
		this.fov = 2 / Math.pow(2, global.arenaFovUpgrades);
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#d0d0d0';
		ctx.fillRect(0, 0, game.width, game.height);
		ctx.fillStyle = '#dbdbdb';
		ctx.fillRect(
			this.minX * game.scale * this.fov,
			this.minY * game.scale * this.fov,
			this.maxX * game.scale * this.fov,
			this.maxY * game.scale * this.fov
		);
		ctx.beginPath();
		const grid = 30 * game.scale * this.fov;
		for (let x = (game.width / 2) % grid; x < game.width; x += grid) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, game.height);
		}
		for (let y = (game.height / 2) % grid; y < game.height; y += grid) {
			ctx.moveTo(0, y);
			ctx.lineTo(game.width, y);
		}
		ctx.lineWidth = game.scale / 2 * this.fov;
		ctx.strokeStyle = 'rgba(0,0,0,0.1)';
		ctx.stroke();
	}

	applyForce(pos: Vector, size: number, power: number): Vector {
		const accel = new Vector();
		accel.x -= Math.min(0, pos.x - size - this.minX) * power;
		accel.y -= Math.min(0, pos.y - size - this.minY) * power;
		accel.x -= Math.max(0, pos.x + size - this.minX - this.maxX) * power;
		accel.y -= Math.max(0, pos.y + size - this.minY - this.maxY) * power;
		return accel;
	}
}
