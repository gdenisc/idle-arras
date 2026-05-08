import { darker } from './color';
import { game } from './game';
import { mouse } from './mouse';
import { drawText } from './text';

export class Button {
	private fill: string;
	private stroke: string;

	constructor(
		readonly callback: () => void,
		color: string
	) {
		this.fill = color;
		this.stroke = darker(color, 0.75);
	}

	render(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		text: string,
		disabled: boolean
	) {
		const hover =
			!disabled &&
			mouse.x > x &&
			mouse.y > y &&
			mouse.x < x + width &&
			mouse.y < y + height;
		const click = hover && mouse.left;
		ctx.lineWidth = 12 * game.scale;
		ctx.strokeStyle = '#222';
		ctx.strokeRect(x, y, width, height);
		ctx.fillStyle = click ? this.stroke : this.fill;
		ctx.fillRect(x, y, width, height);
		ctx.fillStyle = click ? this.fill : this.stroke;
		ctx.fillRect(x, y + height * 0.6, width, height * 0.4);
		if (hover) {
			ctx.fillStyle = 'rgba(255,255,255,0.1)';
			ctx.fillRect(x, y, width, height);
		}
		if (text) {
			drawText(ctx, text, x + width / 2, y + height / 2, false, true, true, 24 * game.scale);
		}
		if (disabled) {
			ctx.fillStyle = 'rgba(0,0,0,0.2)';
			ctx.fillRect(x, y, width, height);
		}
		if (hover && mouse.leftRelease) {
			this.callback();
		}
	}
}
