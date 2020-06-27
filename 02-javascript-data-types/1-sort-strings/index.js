/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
 
//https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
 
export function sortStrings(arr, param = 'asc') {
	let arRes = arr.slice().sort(compareFunction);
	if (param === 'desc') arRes = arRes.reverse();
	return arRes;
}

function compareFunction(a, b) {

	if (a === b) return 0;

	let aWithoutDiacritics = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	let bWithoutDiacritics = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		
	if (aWithoutDiacritics.toLowerCase() > bWithoutDiacritics.toLowerCase()) return 1;
	if (aWithoutDiacritics.toLowerCase() < bWithoutDiacritics.toLowerCase()) return -1;

    if (a > b) return 1;
    if (a < b) return -1;	
	
}
