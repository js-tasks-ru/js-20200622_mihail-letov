/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
	return function(product) {
		const fields = path.split('.');
		let currentLevelVal = product;
		for (const field of fields) {
			if (typeof currentLevelVal[field] === "undefined") return undefined;
			currentLevelVal = currentLevelVal[field];
		}
		return currentLevelVal;
	}
}
