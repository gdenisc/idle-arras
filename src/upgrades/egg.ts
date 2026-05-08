import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';
import { EvolutionTierUpgrade } from './factory';

class IncreaseEvolutionTier extends EvolutionTierUpgrade {
	color(): string {
		return colors.egg;
	}

	amount(): number {
		return global.layersCaps[0];
	}

	max(): number {
		return 4;
	}

	cost(x: number) {
		return Math.pow(11, x);
	}

	buy(): void {
		global.layersCaps[0] += 1;
	}
}

class NerfEvolutionTime implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.eggEvoTimeUpgrades += 1;
		global.shapeEvoNerf[0] *= 1.25;
	}, colors.egg);

	getLabel(): string {
		return (
			'Decrease Evolution Time (' +
			formatNumber(global.shapeEvoNerf[0]) +
			'x less)'
		);
	}

	requirement() {
		return global.layersCaps[0] <= 1;
	}

	max() {
		return global.shapeEvoNerf[0] >= 1000;
	}

	cost() {
		return Math.round(Math.pow(6, global.eggEvoTimeUpgrades)) + 14;
	}

	getSecondary(): string {
		return this.max()
			? 'MAX'
			: formatNumber(this.cost()) + ' score and at least 1 evolution upgrade';
	}

	isDisabled(): boolean {
		return this.requirement() || !this.max() || global.score < this.cost();
	}
}

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
	new IncreaseEvolutionTier(),
	new NerfEvolutionTime(),
	new UnlockSquares()
];
