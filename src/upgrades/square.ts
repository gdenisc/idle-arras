import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { calculateShapeType } from '../shapeTypes';
import { makeShapeUpgrades } from './factory';

class UnlockTriangles implements Upgrade {
	button = new Button(() => {
		global.trianglesUnlocked = true;
	}, colors.triangle);

	getLabel(): string {
		return 'Unlock Triangle Upgrades';
	}

	requirement() {
		return calculateShapeType(global.shapeTypeBuff) > 3;
	}

	cost() {
		return 1e7;
	}

	getSecondary(): string {
		return global.trianglesUnlocked
			? 'UNLOCKED'
			: formatNumber(this.cost()) +
					' score. Get enough of chance to spawn the first triangle';
	}

	isDisabled(): boolean {
		return (
			global.trianglesUnlocked ||
			!this.requirement() ||
			global.score < this.cost()
		);
	}
}

export const squareUpgrades = [
	...makeShapeUpgrades(
		1,
		5,
		'square',
		x => Math.pow(7, x + 3),
		x => 1000 * Math.pow(6, x), // multiplied egg formula
		{
			mult: 1.16,
			max: 10,
			cost: x => Math.pow(2, x + 12)
		}
	),
	new UnlockTriangles()
];
