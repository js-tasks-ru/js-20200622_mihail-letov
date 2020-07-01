/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {	
	if (typeof size === "undefined") return string;	
	let strRes = "";
	const arStr = Array.from(string);
	let counter;
	for (let i = 0;i < arStr.length;i++) {
		if (i === 0 || arStr[i - 1] != arStr[i]) counter = 0;		
		if (counter < size) strRes += arStr[i];		
		counter++;
	}
	return strRes;
}

/*
if (typeof size === "undefined") return string;	
const arRes = Array.from(string).filter((el, index, array) => {
	if (index < size) return true;			
	for (let i = index - 1;i >= index - size; i--) {
		if (array[i] !== el) return true;
	}
	return false;
});	
return arRes.join("");
*/
