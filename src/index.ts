import { game } from './game';
import global from './global';
import { mouse } from './mouse';
import { Shape } from './shape';
import './saves';
import { Button } from './button';
import { loadSave, makeSave } from './saves';

const saveBtn = new Button(() => prompt('Copy the save', makeSave()), '#3085db');
const loadBtn = new Button(() => {
	const save = prompt('Load save');
	if (save) {
		loadSave(save);
	}
}, '#db9146');

let nextShapeTime = 0;

let lastAnim = 0;
const animLoop = function (time: number) {
	//const dt = (time - lastAnim) / 1000;
	lastAnim = time;

	while (game.shapes.length < global.shapesCap && time > nextShapeTime) {
		game.shapes.push(Shape.random());
		if (game.shapes.length == global.shapesCap) {
			nextShapeTime = time;
		}
		nextShapeTime += (0.5 + Math.random() * 0.5) * global.shapesSpawnInterval;
	}

	game.update();
	game.render();
	try {
		saveBtn.render(
			game.ctx,
			6 * game.scale,
			6 * game.scale,
			100 * game.scale,
			50 * game.scale,
			'Save',
			false
		);
		loadBtn.render(
			game.ctx,
			106 * game.scale,
			6 * game.scale,
			100 * game.scale,
			50 * game.scale,
			'Load',
			false
		);
	} catch (e) {
		console.error(e);
	}
	mouse.resetClicks();

	requestAnimationFrame(animLoop);
};

animLoop(0);
