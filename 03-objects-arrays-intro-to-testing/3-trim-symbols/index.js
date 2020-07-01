/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {	
	if (typeof size === "undefined") return string;	
	const ar = Array.from(string).filter((el, index, array) => {
		if (index < size) return true;			
		for (let i = index - 1;i >= index - size; i--) {
			if (array[i] !== el) return true;
		}
		return false;
	});	
	return ar.join("");
}
