import global from './global';

export const makeSave = function () {
	let save = JSON.stringify(global).split('');
	let seed = 695193841 | 0;
	for (let i = 0; i < save.length; ++i) {
		seed ^= seed << 7;
		seed ^= seed >> 5;
		seed ^= seed << 11;
		save[i] = String.fromCharCode(save[i].charCodeAt(0) ^ (seed & 0xff));
	}
	return btoa(save.join(''));
};

export const loadSave = function (save: string) {
	let arr = atob(save).split('');

	let seed = 695193841 | 0;
	for (let i = 0; i < arr.length; ++i) {
		seed ^= seed << 7;
		seed ^= seed >> 5;
		seed ^= seed << 11;
		arr[i] = String.fromCharCode(arr[i].charCodeAt(0) ^ (seed & 0xff));
	}

	const json = JSON.parse(arr.join(''));

	const keys = Object.keys(json);
	for (const key of keys) {
		if (key in global) {
			(global as any)[key] = json[key];
		}
	}
};
