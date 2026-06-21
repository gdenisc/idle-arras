import global from './global';

export const convertSave = function (old: any) {
	switch (old.version) {
		case undefined:
			alert('Beta saves can break things');
			old.version = 1;
			return true;
	}
	return false;
}

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

	if (json.version !== global.version) {
		let oldVersion = json.version;

		// version 1 -> version 2 -> ... -> version n
		// until up to date
		while (convertSave(json)) {}

		if (json.version != global.version) {
			alert(`Failed to load a save (old: ${oldVersion} converted: ${json.version} new: ${global.version})`);
		}
	}

	const keys = Object.keys(json);
	for (const key of keys) {
		if (key in global) {
			// not related to js globals
			(global as any)[key] = json[key];
		}
	}
};
