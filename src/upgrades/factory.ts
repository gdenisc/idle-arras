import type { Upgrade } from '.';
import { Button } from '../button';
import { colors } from '../color';
import global from '../global';
import { formatNumber } from '../number';

export const valueOr = function (
	value: number,
	text: string,
	cond: boolean,
	postfix = 'score'
) {
	return cond ? text : formatNumber(value) + ' ' + postfix;
};

export const valueOrMax = function (
	value: number,
	cond: boolean,
	postfix = 'score'
) {
	return valueOr(value, 'MAX', cond, postfix);
};

export const valueOrUnlock = function (
	value: number,
	cond: boolean,
	postfix = 'score'
) {
	return valueOr(value, 'UNLOCK', cond, postfix);
};

interface INewUpgrade {
	buy: () => void;
	label: () => string;
	text: () => string;
	cost?: () => number;
	disable?: () => boolean;
	color: keyof typeof colors;
}

export class UpgradeProto implements Upgrade {
	button: Button;

	constructor(readonly upg: INewUpgrade) {
		this.button = new Button(() => {
			if (this.upg.cost) {
				global.score -= this.upg.cost();
			}
			upg.buy();
		}, colors[upg.color]);
	}

	getLabel(): string {
		return this.upg.label();
	}

	getSecondary(): string {
		return this.upg.text();
	}

	isDisabled(): boolean {
		return (
			(this.upg.disable ? this.upg.disable() : false) ||
			(this.upg.cost ? global.score < this.upg.cost() : false)
		);
	}
}

export const makeShapeUpgrades = function (
	id: number,
	max: number,
	color: keyof typeof colors,
	evoCost: (x: number) => number,
	nerfCost: (x: number) => number,
	shapeBuff?: { max: number; mult: number; cost: (x: number) => number }
) {
	const upgrades = [
		new UpgradeProto({
			color,
			buy: () => (global.layersCaps[id] += 1),
			label: () =>
				'+1 Evolution (' + (global.layersCaps[id] - 1) + '/' + max + ')',
			text: () =>
				valueOrMax(evoCost(global.layersCaps[id]), global.layersCaps[id] > max),
			cost: () => evoCost(global.layersCaps[id]),
			disable: () => global.layersCaps[id] > max
		}),
		new UpgradeProto({
			color,
			buy: () => {
				global.shapeEvoNerf[id] *= 1 + 1 / (2 + id);
				global.evoTimeUpgrades[id] += 1;
			},
			label: () =>
				'Decrease Evolution Time (' +
				formatNumber(global.shapeEvoNerf[id]) +
				'x less)',
			text: () =>
				valueOrMax(
					nerfCost(global.evoTimeUpgrades[id]),
					global.shapeEvoNerf[id] >= 1000,
					'score and at least 1 evolution upgrade'
				),
			cost: () => nerfCost(global.evoTimeUpgrades[id]),
			disable: () =>
				global.layersCaps[id] <= 1 || global.shapeEvoNerf[id] > 1000
		})
	];

	if (shapeBuff) {
		upgrades.push(
			new UpgradeProto({
				color,
				buy: () => {
					global.shapeTypeBuff *= shapeBuff.mult;
					global.buffUpgrades[id] += 1;
				},
				label: () =>
					'Increase Possibility of New Shapes (' +
					formatNumber(global.shapeTypeBuff) +
					'x)',
				text: () =>
					valueOrMax(
						shapeBuff.cost(global.buffUpgrades[id]),
						global.buffUpgrades[id] > shapeBuff.max
					),
				cost: () => shapeBuff.cost(global.buffUpgrades[id]),
				disable: () => global.buffUpgrades[id] > shapeBuff.max
			})
		);
	}

	return upgrades;
};
