/**
 * Returns a number with a fixed number of decimals.
 *
 * @description Space complexity: O(1), Time complexity: O(1).
 * @param {Number} number - Number to fix.
 * @param {Number} precision - Number of decimals to keep.
 * @returns {Number} - Number with a fixed number of decimals.
 * @throws {TypeError} - Argument must be a number.
 * @throws {TypeError} - Argument must be finite.
 */
export const fixDecimals = (number, precision = 12) => {
  if (typeof number !== 'number' || typeof precision !== 'number') {
    throw new TypeError('Argument must be a number.')
  } else if (!Number.isFinite(number) || !Number.isFinite(precision)) {
    throw new TypeError('Argument must be finite.')
  }

  return Number.parseFloat(number.toFixed(precision))
}

/**
 * Returns the number of decimals of a number.
 * 
 * @description Space complexity: O(1), Time complexity: O(1).
 * @param {Number} number - Number to count decimals of.
 * @returns {Number} - Number of decimals.
 * @throws {TypeError} - Argument must be a number.
 * @throws {TypeError} - Argument must be finite.
 */
export const countDecimals = (number) => {
  if (typeof number !== 'number') {
    throw new TypeError('Argument must be a number.')
  } else if (!Number.isFinite(number)) {
    throw new TypeError('Argument must be finite.')
  }

  return number.toString().split('.').at(1)?.length ?? 0
}

/**
 * Returns the absolute value of a number.
 * 
 * @description Space complexity: O(1), Time complexity: O(1).
 * @param {Number} number - Number to get absolute value of.
 * @returns {Number} - Absolute value of number.
 */
export const abs = (number) => {
  return number < 0 ? -number : number
}
