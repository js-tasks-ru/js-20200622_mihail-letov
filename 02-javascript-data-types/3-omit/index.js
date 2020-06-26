/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
	var resObj = {};
	var keys = Object.keys(obj);
	for (var i = 0; i < keys.length;i++) {
		var key = keys[i];
		if (!fields.includes(key))
		{
			resObj[key] = obj[key];
		}
	}
	return resObj;
};
