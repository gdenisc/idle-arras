import global from './global';
import { formatNumber } from './number';
import { Room } from './room';
import { Shape } from './shape';
import { drawText } from './text';
import { allTabs, generalTab, type UpgradeTab } from './upgrades';

export class Game {
	readonly canvas = document.createElement('canvas');
	readonly ctx = this.canvas.getContext('2d')!;
	width = 0;
	height = 0;
	scale = 1;
	room = new Room();
	shapes: Shape[] = [];
	flyingText: { x: number; y: number; alpha: number; text: string }[] = [];
	tabs: UpgradeTab[] = allTabs;
	currentTab: UpgradeTab = generalTab;

	update() {
		this.room.update();
		for (let i = this.shapes.length - 1; i > -1; --i) {
			const shape = this.shapes[i];
			shape.update();
			for (const shape2 of this.shapes) {
				if (shape == shape2 || shape2.isDead()) continue;
				shape.collide(shape2);
			}
			if (shape.isDead()) {
				this.shapes.splice(i, 1);
			}
		}
		for (let i = this.flyingText.length - 1; i > -1; --i) {
			const text = this.flyingText[i];
			text.y -= 1;
			text.alpha -= 0.01;
			if (text.alpha <= 0) {
				this.flyingText.splice(i, 1);
			}
		}
	}

	render() {
		const ctx = this.ctx;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		this.room.render(ctx);
		for (const object of this.shapes) {
			object.render(ctx);
		}
		for (const text of this.flyingText) {
			ctx.globalAlpha = text.alpha;
			drawText(
				ctx,
				text.text,
				text.x,
				text.y,
				false,
				false,
				true,
				32 * game.scale
			);
		}
		ctx.globalAlpha = 1;
		let pos = 0;
		for (let i = 0; i < this.tabs.length; ++i) {
			const tab = this.tabs[i];
			if (!tab.isUnlocked || tab.isUnlocked()) {
				tab.render(
					ctx,
					(pos % 3) * 320 * game.scale,
					((pos / 3) | 0) * 70 * game.scale
				);
				pos += 1;
			}
		}
		for (let i = 0; i < this.currentTab.upgrades.length; ++i) {
			const upgrade = this.currentTab.upgrades[i];
			const x = this.width / 2 + 6 * game.scale;
			const y = (320 + 70 * 3 + 100 * i) * game.scale;
			upgrade.button.render(
				ctx,
				x,
				y,
				(320 * 3 - 20) * game.scale,
				80 * game.scale,
				'',
				upgrade.isDisabled()
			);
			drawText(
				ctx,
				upgrade.getLabel(),
				x + 8 * game.scale,
				y + 8 * game.scale,
				false,
				true,
				false,
				32 * game.scale
			);
			drawText(
				ctx,
				upgrade.getSecondary(),
				x + 8 * game.scale,
				y + (8 + 28 + 16) * game.scale,
				false,
				true,
				false,
				24 * game.scale
			);
		}
		drawText(
			ctx,
			'You have ' + formatNumber(global.score) + ' score',
			game.width / 2,
			120 * game.scale,
			false,
			true,
			true,
			48 * game.scale
		);
		drawText(
			ctx,
			'Shapes: ' + this.shapes.length + '/' + global.shapesCap,
			game.width / 2,
			(120 + 48 / 2 + 16) * game.scale,
			this.shapes.length == global.shapesCap,
			true,
			true,
			24 * game.scale
		);
	}

	resize() {
		const dpi = window.devicePixelRatio;
		this.width = window.innerWidth * dpi;
		this.height = window.innerHeight * dpi;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		// i know it should be max but min is better here
		this.scale = Math.min(this.width / 1920, this.height / 1080);
	}
}

export const game = new Game();
game.resize();
window.addEventListener('resize', () => game.resize());
window.addEventListener('contextmenu', e => e.preventDefault());
document.body.appendChild(game.canvas);
