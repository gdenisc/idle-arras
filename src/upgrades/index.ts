import { Button } from '../button';
import { colors, darker } from '../color';
import { game } from '../game';
import global from '../global';
import { drawShape } from '../shape';
import { getShapeType, type ShapeType } from '../shapeTypes';
import { eggUpgrades } from './egg';
import { generalUpgrades } from './general';
import { pentagonUpgrades } from './pentagon';
import { squareUpgrades } from './square';
import { triangleUpgrades } from './triangle';

export interface Upgrade {
	button: Button;
	getLabel(): string;
	getSecondary(): string;
	isDisabled(): boolean;
}

export class UpgradeTab {
	readonly btn: Button;

	constructor(
		readonly name: string,
		readonly upgrades: Upgrade[],
		readonly color: string,
		readonly logo?: ShapeType,
		readonly isUnlocked?: () => boolean
	) {
		this.btn = new Button(() => {
			game.currentTab = this;
		}, this.color);
	}

	render(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
		const x = dx + game.width / 2 + 6 * game.scale;
		const y = dy + 320 * game.scale;
		const width = 300 * game.scale;
		const height = 50 * game.scale;
		this.btn.render(
			ctx,
			x,
			y,
			width,
			height,
			this.name,
			game.currentTab == this
		);
		if (this.logo) {
			const logo = this.logo!;
			const scale = 1 / game.scale / game.room.fov;
			drawShape(
				ctx,
				(x + 26) * scale,
				(y + height / 2) * scale,
				Math.min(20, logo.size * 2) * scale * game.scale,
				Math.PI / 4,
				logo.sides
			);
			ctx.fillStyle = logo.color;
			ctx.strokeStyle = darker(logo.color);
			ctx.lineWidth = 4 * game.scale;
			ctx.fill();
			ctx.stroke();
		}
	}
}

export const generalTab = new UpgradeTab(
	'General',
	generalUpgrades,
	colors.blue
);

const eggTab = new UpgradeTab(
	'Egg',
	eggUpgrades,
	colors.egg,
	getShapeType(0, -1, 1)
);
const squareTab = new UpgradeTab(
	'Square',
	squareUpgrades,
	colors.square,
	getShapeType(1, -1, 1),
	() => global.squaresUnlocked
);
const triangleTab = new UpgradeTab(
	'Triangle',
	triangleUpgrades,
	colors.triangle,
	getShapeType(2, -1, 1),
	() => global.trianglesUnlocked
);
const pentagonTab = new UpgradeTab(
	'Pentagon',
	pentagonUpgrades,
	colors.pentagon,
	getShapeType(3, -1, 1),
	() => global.pentagonsUnlocked
);
const hexagonTab = new UpgradeTab(
	'Hexagon',
	[],
	colors.hexagon,
	getShapeType(4, -1, 1),
	() => global.hexagonsUnlocked
);
const heptagonTab = new UpgradeTab(
	'Heptagon',
	[],
	colors.heptagon,
	getShapeType(5, -1, 1),
	() => global.heptagonsUnlocked
);
const octagonTab = new UpgradeTab(
	'Octagon',
	[],
	colors.octagon,
	getShapeType(6, -1, 1),
	() => global.octagonsUnlocked
);
const nonagonTab = new UpgradeTab(
	'Nonagon',
	[],
	colors.nonagon,
	getShapeType(7, -1, 1),
	() => global.nonagonsUnlocked
);

export const allTabs = [
	generalTab,
	eggTab,
	squareTab,
	triangleTab,
	pentagonTab,
	hexagonTab,
	heptagonTab,
	octagonTab,
	nonagonTab
];
