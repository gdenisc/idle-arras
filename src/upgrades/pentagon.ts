import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { calculateShapeType } from '../shapeTypes';
import { makeShapeUpgrades } from './factory';

class ClickDamageBuff implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.clickDamage += 1;
	}, colors.legendary);

	getLabel(): string {
		return 'Increase Click Damage By 1';
	}

	cost() {
		return 1e11;
	}

	getSecondary(): string {
		return global.clickDamage > 1
			? 'MAX'
			: formatNumber(this.cost()) + ' score.';
	}

	isDisabled(): boolean {
		return global.clickDamage > 1 || global.score < this.cost();
	}
}

class UnlockHexagons implements Upgrade {
	button = new Button(() => {
		global.hexagonsUnlocked = true;
	}, colors.hexagon);

	getLabel(): string {
		return 'Unlock Hexagon Upgrades';
	}

	requirement() {
		return calculateShapeType(global.shapeTypeBuff) > 5;
	}

	getSecondary(): string {
		return global.hexagonsUnlocked
			? 'UNLOCKED'
			: 'Get enough of chance to spawn the first hexagon';
	}

	isDisabled(): boolean {
		return global.hexagonsUnlocked || !this.requirement();
	}
}

export const pentagonUpgrades = [
	...makeShapeUpgrades(
		3,
		9,
		'pentagon',
		x => Math.round(Math.pow(5.2, x + 11)),
		x => Math.round(Math.pow(6.5, x + 10)),
		{
			mult: 1.145,
			max: 11,
			cost: x =>
				Math.round(
					Math.pow(2.4, Math.pow(x, 1.05) + 24)
				)
		}
	),
	new ClickDamageBuff(),
	new UnlockHexagons()
];
