import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { calculateShapeType } from '../shapeTypes';

class IncreaseEvolutionTier implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.layersCaps[1] += 1;
	}, colors.square);

	getLabel(): string {
		return '+1 Evolution (' + (global.layersCaps[1] - 1) + '/5)';
	}

	max() {
		return global.layersCaps[1] > 5;
	}

	cost() {
		return Math.pow(7, global.layersCaps[1] + 3);
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
		global.squareEvoTimeUpgrades += 1;
		global.shapeEvoNerf[1] *= 1.5;
	}, colors.square);

	getLabel(): string {
		return (
			'Decrease Evolution Time (' +
			formatNumber(global.shapeEvoNerf[1]) +
			'x less)'
		);
	}

	requirement() {
		return global.layersCaps[1] <= 1;
	}

	cost() {
		return 1000 * Math.round(Math.pow(6, global.squareEvoTimeUpgrades));
	}

	getSecondary(): string {
		return formatNumber(this.cost()) + ' score and at least 1 evolution upgrade';
	}

	isDisabled(): boolean {
		return this.requirement() || global.score < this.cost();
	}
}

class ShapeTypeBuff implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.squareBuffUpgrades += 1;
		global.shapeTypeBuff *= 1.16;
	}, colors.square);

	getLabel(): string {
		return (
			'Increase Possibility of New Shapes (' +
			formatNumber(global.shapeTypeBuff) +
			'x)'
		);
	}

	max() {
		return global.squareBuffUpgrades >= 10;
	}

	cost() {
		return Math.round(Math.pow(2, global.squareBuffUpgrades + 12));
	}

	getSecondary(): string {
		return this.max() ? 'MAX' : formatNumber(this.cost()) + ' score.';
	}

	isDisabled(): boolean {
		return global.score < this.cost() || this.max();
	}
}

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
	new IncreaseEvolutionTier(),
	new NerfEvolutionTime(),
	new ShapeTypeBuff(),
	new UnlockTriangles()
];
