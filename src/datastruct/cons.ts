export function cons<T>(h: T) {
	return function (t: T[]) {
		return [h, ...t];
	};
}
