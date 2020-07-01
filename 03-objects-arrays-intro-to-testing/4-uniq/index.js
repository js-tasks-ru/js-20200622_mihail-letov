/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
	const arRes = (typeof arr !== "undefined") ? [...new Set(arr)] : []; 
	return arRes;
}
