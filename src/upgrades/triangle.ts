import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { calculateShapeRarity, calculateShapeType } from '../shapeTypes';
import { makeShapeUpgrades } from './factory';

class UnlockLegendary implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.rarityCap += 1;
	}, colors.legendary);

	getLabel(): string {
		return 'Unlock Legendary Rarity';
	}

	cost() {
		return 5e7;
	}

	requirement() {
		return calculateShapeRarity(global.shapeRarityBuff) > 3;
	}

	getSecondary(): string {
		return global.rarityCap > 0
			? 'UNLOCKED'
			: formatNumber(this.cost()) + ' score and it should be able to spawn.';
	}

	isDisabled(): boolean {
		// pentagons upgrade: increase multiplier for rare shapes <- they are good enough
		// note: check for shadow that legendary is unlocked
		return (
			global.rarityCap > 0 || !this.requirement() || global.score < this.cost()
		);
	}
}

class UnlockPentagons implements Upgrade {
	button = new Button(() => {
		global.pentagonsUnlocked = true;
	}, colors.pentagon);

	getLabel(): string {
		return 'Unlock Pentagon Upgrades';
	}

	requirement() {
		return global.shapesCap >= 18 && calculateShapeType(global.shapeTypeBuff) > 4;
	}

	getSecondary(): string {
		return global.pentagonsUnlocked
			? 'UNLOCKED'
			: '18 max shapes. Get enough of chance to spawn the first pentagon';
	}

	isDisabled(): boolean {
		return global.pentagonsUnlocked || !this.requirement();
	}
}

export const triangleUpgrades = [
	...makeShapeUpgrades(
		2,
		5,
		'triangle',
		x => Math.round(Math.pow(4.1, x + 10)),
		x => Math.pow(7, x + 5),
		{
			mult: 1.151,
			max: 10,
			cost: x => Math.pow(2, x + 22)
		}
	),
	new UnlockLegendary(),
	new UnlockPentagons()
];
