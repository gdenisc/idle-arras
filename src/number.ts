export const formatNumber = function (x: number): string {
	if (x >= 1e6) {
		return x.toExponential(3).replace('+', '');
	} else if (x >= 1e3 && Number.isInteger(x)) {
		let s = x + '';
		let len = s.length;
		return s.slice(0, len - 3) + ',' + s.slice(len - 3, len);
	}
	let integer = Math.trunc(x);
	let float = x - integer;
	let f = ((Math.round(float * 100) / 100) + '').slice(1);
	return integer + f;
};
