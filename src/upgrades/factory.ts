import type { Upgrade } from '.';
import { Button } from '../button';
import global from '../global';
import { formatNumber } from '../number';

export abstract class EvolutionTierUpgrade implements Upgrade {
	button = new Button(() => {
		global.score -= this.cost(this.amount());
		this.buy();
	}, this.color());

	abstract color(): string;
	abstract amount(): number;
	abstract max(): number;
	abstract cost(x: number): number;
	abstract buy(): void;

	getLabel(): string {
		return '+1 Evolution (' + (this.amount() - 1) + '/' + this.max() + ')';
	}

	getSecondary(): string {
		return this.amount() >= this.max()
			? 'MAX'
			: formatNumber(this.cost(this.amount())) + ' score';
	}

	isDisabled(): boolean {
		return this.amount() >= this.max() || global.score < this.cost(this.amount());
	}
}
