/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
	let arRes = []; 
	if (typeof arr !== "undefined") {
		arRes = [...arr].filter( (element, index, array)=>{ 
			return array.indexOf(element) === index;
		});
	}
	return arRes;
}
