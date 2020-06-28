/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
 
//https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
//https://stackoverflow.com/questions/19487815/passing-additional-parameters-in-the-comparefunction-of-sort-method
 
Array.prototype.customSort = function (sortParam) {
	
	function compare(a, b) {
		if (a === b) return 0;	
		const locCompare = a.localeCompare(b, 'ru');
		const lowerCase = (a.toLowerCase() === b.toLowerCase()) ? "lowerCaseEqual" : "lowerCaseNotEqual";
		const arRes = {
			"asc": {
				"lowerCaseEqual": locCompare*-1,			
				"lowerCaseNotEqual": locCompare	
			},
			"desc": {
				"lowerCaseEqual": locCompare,		
				"lowerCaseNotEqual": locCompare*-1	
			}	
		};
		return arRes[sortParam][lowerCase];
	}
	return this.sort(compare);
	
}
 
export function sortStrings(arr, param = 'asc') {
	let arRes = [...arr].customSort(param);
	return arRes;
}

