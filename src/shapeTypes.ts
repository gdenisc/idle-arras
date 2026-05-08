import { colors } from './color';
import global from './global';

export interface ShapeType {
	type: number;
	size: number;
	sides: number;
	color: string;
	score: number;
}

const LOG5 = Math.log(5);
const LOG3 = Math.log(3);

export const calculateShapeType = function (value: number) {
	return Math.log(5 + value) / LOG5;
};

export const calculateShapeRarity = function (value: number) {
	return 1 + value;
};

const typeColors = [
	colors.egg,
	colors.square,
	colors.triangle,
	colors.pentagon,
	colors.hexagon,
	colors.heptagon,
	colors.octagon,
	colors.nonagon
];
const rarityColors = [
	colors.shiny,
	colors.legendary,
	colors.shadow,
	colors.ultra
];
export const typeSizes = [5, 20, 20, 26, 28, 28 * 2, 28 * 4, 28 * 8];
export const typeSides = [0, 4, 3, 5, 6, 7, 8, 9];
export const getShape = function (
	random: number,
	rarityRandom: number,
	layers: number
): ShapeType {
	const shapeType = Math.min(8, calculateShapeType(random) | 0) - 1;
	const rarityType = Math.min(
		global.rarityCap,
		Math.floor(calculateShapeRarity(rarityRandom)) - 2
	);

	return getShapeType(shapeType, rarityType, layers);
};

const typeScore = [1, 2e2, 4e4, 8e6, 16e8, 32e10, 64e12, 128e14];
export const getShapeType = function (
	shapeType: number,
	rarityType: number,
	layers: number
) {
	let color;

	if (rarityType >= 0) {
		color = rarityColors[rarityType];
	} else {
		color = typeColors[shapeType];
	}

	return {
		type: shapeType,
		size: typeSizes[shapeType],
		sides: typeSides[shapeType],
		color,
		score:
			typeScore[shapeType] *
			Math.pow(5, layers) *
			Math.pow(10, Math.max(0, rarityType + 1))
	};
};
