/**
 * Capitalize the first letter of a string
 * @param value {string | number}
 * @returns {string}
 */
export const capitalize = (value) => value?.toString()?.charAt(0)?.toUpperCase() + value?.toString()?.slice(1);

/**
 * Get the name of a variable
 * @param varObj {{}}
 * @returns {string}
 */
export const VN = (varObj) => Object.keys(varObj)[0];

/**
 * Case-insensitive string inclusion check
 * @param string {string}
 * @param substring {string}
 * @returns {boolean}
 */
export const includesIgnoreCase = (string, substring) => string?.toLowerCase()?.includes(substring?.toLowerCase());

/**
 * Whether to add an 's' to a word depending on the value of a number representing an amount
 * @param amount {number} - The quantity of something
 * @returns {string} - and S or an empty string
 */
export const sOrNoS = (amount) => (amount > 1 || amount === 0 ? 's' : '');

/**
 * Compare two objects to see if they are equal (shallow)
 * @param object1 {object}
 * @param object2 {object}
 * @returns {boolean}
 */
export function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => object1[key] === object2[key]);
}

/**
 * Compare two objects to see if they are equal (deep)
 * @param object1 {object}
 * @param object2 {object}
 * @returns {boolean}
 */
export function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const val1 = object1[key];
    const val2 = object2[key];

    const areObjects = isObject(val1) && isObject(val2);
    return areObjects ? deepEqual(val1, val2) : val1 === val2;
  });
}

/**
 * Check if a variable is an object
 * @param object {*} - Variable to check
 * @returns {boolean} - Whether the variable is an object
 */
export function isObject(object) {
  return object != null && typeof object === 'object';
}

/**
 * Check if a variable is a string
 * @param val {*} - Variable to check
 * @returns {boolean} - Whether the variable is a string or not
 */
export const isString = (val) => typeof val === 'string';

/**
 * Omit properties from an object
 * @param object {object} - Object to omit properties from
 * @param keys {array} - Array of keys to omit from the object
 * @returns {{}} - Object with omitted properties removed
 */
export function omit(object, keys) {
  if (!object) return {};
  return Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = object[key];
      return acc;
    }, {});
}

/**
 * Get the value of a nested object property
 * @param object {object} - Object to get the value from
 * @param path {string} - Path to the property (e.g. 'foo.bar.baz')
 * @returns {*} - Value of the property
 */
export const deepGet = (object, path) => {
  const keys = path.split('.');
  if (!keys.length) return object; // if path is empty string return object
  if (keys.length === 1) return object[keys[0]]; // if path is one key return object[key]
  let value = object;
  keys.forEach((key) => (value = isObject(value) ? value[key] : undefined));
  return value;
};

/**
 * A function that throttles the execution of a function
 * @param func - The function to throttle
 * @param wait - The time to wait between executions in milliseconds
 * @param options {{leading: boolean, trailing: boolean}} - Options for the throttle
 * @returns {function(): *}
 */
export function throttle(func, wait, options = {}) {
  let timeout, context, args, result;
  let previous = 0;

  const later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };

  const throttled = function () {
    const _now = Date.now();
    if (!previous && options.leading === false) previous = _now;
    const remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
