export default {
	score: 0,

	spawnIntervalUpgrades: 0,
	shinyChanceUpgrades: 0,
	arenaFovUpgrades: 0,
	evoTimeUpgrades: {
		[0]: 0,
		[1]: 0,
		[2]: 0,
		[3]: 0,
		[4]: 0,
		[5]: 0,
		[6]: 0,
		[7]: 0
	} as Record<number, number>,
	buffUpgrades: {
		[1]: 0,
		[2]: 0,
		[3]: 0,
		[4]: 0,
		[5]: 0,
		[6]: 0,
		[7]: 0
	} as Record<number, number>,

	rarityCap: 0, // MAX: 3
	shapesSpawnInterval: 2000,
	shapeTypeBuff: 1,
	shapeRarityBuff: 1,
	clickDamage: 1,
	shapeEvoNerf: {
		[0]: 1,
		[1]: 1,
		[2]: 1,
		[3]: 1,
		[4]: 1,
		[5]: 1,
		[6]: 1,
		[7]: 1
	} as Record<number, number>,
	layersBuff: 0,
	shapesCap: 10,
	layersCaps: {
		[0]: 1, // MAX: 5
		[1]: 1, // MAX: 6
		[2]: 1, // MAX: 6
		[3]: 1, // MAX: 10
		[4]: 1, // MAX: 15
		[5]: 1, // MAX: 20
		[6]: 1, // MAX: 25
		[7]: 1
	} as Record<number, number>,

	squaresUnlocked: false,
	trianglesUnlocked: false,
	pentagonsUnlocked: false,
	hexagonsUnlocked: false,
	heptagonsUnlocked: false,
	octagonsUnlocked: false,
	nonagonsUnlocked: false
};
