import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { calculateShapeRarity, calculateShapeType } from '../shapeTypes';

class IncreaseEvolutionTier implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.layersCaps[2] += 1;
	}, colors.triangle);

	getLabel(): string {
		return '+1 Evolution (' + (global.layersCaps[2] - 1) + '/5)';
	}

	max() {
		return global.layersCaps[2] > 5;
	}

	cost() {
		return Math.round(Math.pow(4.1, global.layersCaps[2] + 10));
	}

	getSecondary(): string {
		return this.max() ? 'MAX' : formatNumber(this.cost()) + ' score';
	}

	isDisabled(): boolean {
		return this.max() || global.score < this.cost();
	}
}

class NerfEvolutionTime implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.triangleEvoTimeUpgrades += 1;
		global.shapeEvoNerf[2] *= 1.25;
	}, colors.triangle);

	getLabel(): string {
		return (
			'Decrease Evolution Time (' +
			formatNumber(global.shapeEvoNerf[2]) +
			'x less)'
		);
	}

	requirement() {
		return global.layersCaps[2] <= 1;
	}

	cost() {
		return Math.round(Math.pow(7, global.triangleEvoTimeUpgrades + 5));
	}

	getSecondary(): string {
		return (
			formatNumber(this.cost()) + ' score and at least 1 evolution upgrade'
		);
	}

	isDisabled(): boolean {
		return this.requirement() || global.score < this.cost();
	}
}

class ShapeTypeBuff implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.triangleBuffUpgrades += 1;
		global.shapeTypeBuff *= 1.151;
	}, colors.triangle);

	getLabel(): string {
		return (
			'Increase Possibility of New Shapes (' +
			formatNumber(global.shapeTypeBuff) +
			'x)'
		);
	}

	max() {
		return global.triangleBuffUpgrades >= 10;
	}

	cost() {
		return Math.round(Math.pow(2, global.triangleBuffUpgrades + 22));
	}

	getSecondary(): string {
		return this.max() ? 'MAX' : formatNumber(this.cost()) + ' score.';
	}

	isDisabled(): boolean {
		return global.score < this.cost() || this.max();
	}
}

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
	new IncreaseEvolutionTier(),
	new NerfEvolutionTime(),
	new ShapeTypeBuff(),
	new UnlockLegendary(),
	new UnlockPentagons()
];
