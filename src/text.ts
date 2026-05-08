import { game } from './game';

export const drawText = function (
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	redColor = false,
	border = true,
	centered = false,
	size = 24 * game.scale
) {
	if (centered) {
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
	} else {
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
	}
	ctx.font = size + 'px Ubuntu';
	ctx.fillStyle = redColor ? '#e7896d' : '#fff';
	ctx.strokeStyle = '#222';
	ctx.lineWidth = size / 4;
	if (border) ctx.strokeText(text, x, y);
	ctx.fillText(text, x, y);
};
