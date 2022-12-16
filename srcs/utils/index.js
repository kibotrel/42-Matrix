/**
 * Returns a number with a fixed number of decimals.
 *
 * @param {number} number - Number to fix.
 * @returns {number} - Number with a fixed number of decimals.
 * @throws {Error} - Argument must be a number.
 * @throws {Error} - Argument must be finite.
 */
export const fixDecimals = (number) => {
  if (typeof number !== 'number') {
    throw new TypeError('Argument must be a number.')
  } else if (!Number.isFinite(number)) {
    throw new TypeError('Argument must be finite.')
  }
  return Number.parseFloat(number.toFixed(12))
}
