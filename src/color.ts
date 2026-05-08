const cache = new Map<string, string>();

export const darker = function (color: string, power: number = 0.6) {
	let hit = cache.get(color + power);
	if (hit) return hit;

	let r = Math.round(
		parseInt(color.slice(1, 3), 16) * power + 0x22 * (1 - power)
	);
	let g = Math.round(
		parseInt(color.slice(3, 5), 16) * power + 0x22 * (1 - power)
	);
	let b = Math.round(
		parseInt(color.slice(5, 7), 16) * power + 0x22 * (1 - power)
	);
	let a = '';
	if (color.length > 7) {
		a = color.slice(7, 9);
	}

	hit =
		'#' +
		r.toString(16).padStart(2, '0') +
		g.toString(16).padStart(2, '0') +
		b.toString(16).padStart(2, '0') +
		a;

	cache.set(color + power, hit);

	return hit;
};

export const colors = {
	blue: '#3ca4cb',
	darkArena: '#a4a4ad',
	barrel: '#a7a7af',

	egg: '#e8ebf7',
	square: '#efc74b',
	triangle: '#e7896d',
	pentagon: '#8d6adf',
	hexagon: '#7adbba',
	heptagon: '#8abc3f',
	octagon: '#cc669c',
	nonagon: '#dbdbdb',

	shiny: '#b9e87e',
	legendary: '#7ad3db',
	shadow: '#22222220',
	ultra: '#ff4f5d'
};
