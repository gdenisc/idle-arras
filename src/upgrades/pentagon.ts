import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { calculateShapeType } from '../shapeTypes';

class IncreaseEvolutionTier implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.layersCaps[3] += 1;
	}, colors.pentagon);

	getLabel(): string {
		return '+1 Evolution (' + (global.layersCaps[3] - 1) + '/9)';
	}

	max() {
		return global.layersCaps[3] > 9;
	}

	cost() {
		return Math.round(Math.pow(5.2, global.layersCaps[3] + 11));
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
		global.pentagonEvoTimeUpgrades += 1;
		global.shapeEvoNerf[3] *= 1.25;
	}, colors.pentagon);

	getLabel(): string {
		return (
			'Decrease Evolution Time (' +
			formatNumber(global.shapeEvoNerf[3]) +
			'x less)'
		);
	}

	requirement() {
		return global.layersCaps[3] <= 1;
	}

	cost() {
		return Math.round(Math.pow(6.5, global.pentagonEvoTimeUpgrades + 10));
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
		global.pentagonBuffUpgrades += 1;
		global.shapeTypeBuff *= 1.145;
	}, colors.pentagon);

	getLabel(): string {
		return (
			'Increase Possibility of New Shapes (' +
			formatNumber(global.shapeTypeBuff) +
			'x)'
		);
	}

	max() {
		return global.pentagonBuffUpgrades >= 12;
	}

	cost() {
		return Math.round(
			Math.pow(2.4, Math.pow(global.pentagonBuffUpgrades, 1.05) + 24)
		);
	}

	getSecondary(): string {
		return this.max() ? 'MAX' : formatNumber(this.cost()) + ' score.';
	}

	isDisabled(): boolean {
		return global.score < this.cost() || this.max();
	}
}

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
	new IncreaseEvolutionTier(),
	new NerfEvolutionTime(),
	new ShapeTypeBuff(),
	new ClickDamageBuff(),
	new UnlockHexagons()
];
