import { type Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';

class ShapeCountUpgrade implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.shapesCap += 1;
	}, colors.blue);

	getLabel(): string {
		return '+1 Shape Cap (' + global.shapesCap + '/100)';
	}

	cost() {
		return Math.pow(10, global.shapesCap - 9);
	}

	max() {
		return global.shapesCap >= 100;
	}

	getSecondary(): string {
		return this.max() ? 'MAX' : formatNumber(this.cost()) + ' score';
	}

	isDisabled(): boolean {
		return this.max() || global.score < this.cost();
	}
}

class ShapeSpawnIntervalUpgrade implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.spawnIntervalUpgrades += 1;
		global.shapesSpawnInterval /= 1.1;
	}, colors.blue);

	getLabel(): string {
		let second = global.shapesSpawnInterval / 1000;
		let text;
		if (second < 1) {
			second = 1 / second;
			text = second.toFixed(2) + '/s';
		} else {
			text = second.toFixed(2) + 's';
		}
		return '-10% Spawn Interval (' + text + ')';
	}

	cost() {
		return Math.round(
			10 * Math.pow(1.5, Math.pow(global.spawnIntervalUpgrades, 1.25))
		);
	}

	getSecondary(): string {
		return formatNumber(this.cost()) + ' score';
	}

	isDisabled(): boolean {
		return global.score < this.cost();
	}
}

class ShinyChanceBuff implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.shinyChanceUpgrades += 1;
		global.shapeRarityBuff += 0.1;
	}, colors.shiny);

	getLabel(): string {
		return (
			'Increase Rare Shapes Chance (' +
			formatNumber(global.shapeRarityBuff) +
			'x more)'
		);
	}

	cost() {
		return 1000 * Math.pow(3, global.shinyChanceUpgrades);
	}

	getSecondary(): string {
		return formatNumber(this.cost()) + ' score.';
	}

	isDisabled(): boolean {
		return global.score < this.cost();
	}
}

class ArenaFovUpgrade implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost();
		global.arenaFovUpgrades += 1;
	}, colors.darkArena);

	getLabel(): string {
		return 'Increase Arena (' + formatNumber(global.arenaFovUpgrades) + ')';
	}

	max() {
		return global.arenaFovUpgrades >= 3;
	}

	cost() {
		return Math.pow(1e5, Math.pow(global.arenaFovUpgrades + 1, 3)) * 100;
	}

	getSecondary(): string {
		return this.max() ? 'MAX' : formatNumber(this.cost()) + ' score.';
	}

	isDisabled(): boolean {
		return global.score < this.cost() || this.max();
	}
}

export const generalUpgrades = [
	new ShapeCountUpgrade(),
	new ShapeSpawnIntervalUpgrade(),
	new ShinyChanceBuff(),
	new ArenaFovUpgrade()
];
