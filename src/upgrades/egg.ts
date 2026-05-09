import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { makeShapeUpgrades } from './factory';

class UnlockSquares implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.shapeTypeBuff *= 35;
		global.squaresUnlocked = true;
	}, colors.square);

	getLabel(): string {
		return 'Unlock Squares';
	}

	cost() {
		return 5_000;
	}

	getSecondary(): string {
		return global.squaresUnlocked
			? 'UNLOCKED'
			: formatNumber(this.cost()) + ' score';
	}

	isDisabled(): boolean {
		return global.squaresUnlocked || global.score < this.cost();
	}
}

export const eggUpgrades = [
	...makeShapeUpgrades(
		0,
		4,
		'egg',
		x => Math.pow(11, x),
		x => Math.pow(6, x) + 14
	),
	new UnlockSquares()
];
