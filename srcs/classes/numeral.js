import util from 'node:util'

import chalk from 'chalk'

import { fixDecimals } from '#utils'

/**
 * This is a number container. You can store both real and complex numbers in it.
 *
 * @typedef {Object} Numeral
 * @property {Number} r - Real part of the number.
 * @property {Number} i - Imaginary part of the number.
 */

/**
 * This class in a number container. You can store both real and complex numbers in it.
 */
export class Numeral {
  /**
   * @param {Number} real - Real part of the number.
   * @param {Number} imaginary - Imaginary part of the number.
   */
  constructor(real = 0, imaginary = 0) {
    /**
     * Real part of the number.
     *
     * @readonly
     * @type {Number}
     */
    this.r = real
    /**
     * Imaginary part of the number.
     *
     * @readonly
     * @type {Number}
     */
    this.i = imaginary
  }

  /**
   * Returns a string representation of the number.
   *
   * @returns {String} - String representation of the number.
   */
  [util.inspect.custom]() {
    /* c8 ignore start */
    const real = fixDecimals(this.r)
    const imaginary = fixDecimals(this.i)

    if (imaginary === 0) {
      return chalk.yellow(`${real}`)
    } else if (real === 0) {
      return chalk.yellow(
        `${imaginary !== 1 && imaginary !== -1 ? imaginary : imaginary === -1 ? '-' : ''}i`
      )
    } else if (imaginary < 0) {
      return chalk.yellow(
        `${real} - ${imaginary !== 1 && imaginary !== -1 ? -imaginary : ''}i`
      )
    } else {
      return chalk.yellow(
        `${real} + ${imaginary !== 1 && imaginary !== -1 ? imaginary : ''}i`
      )
    }
    /* c8 ignore stop */
  }

  /**
   * Adds two numerals.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} numeral - Numeral to add.
   * @returns {Numeral} - Result of the addition.
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  add(numeral) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    return new Numeral(this.r + numeral.r, this.i + numeral.i)
  }

  /**
   * Subtracts two numerals.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} numeral - Numeral to subtract.
   * @returns {Numeral} - Result of the subtraction.
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  subtract(numeral) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    return new Numeral(this.r - numeral.r, this.i - numeral.i)
  }

  /**
   * Multiplies two numerals.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} numeral - Numeral to multiply.
   * @returns {Numeral} - Result of the multiplication.
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  multiply(numeral) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    const real = this.r * numeral.r - this.i * numeral.i
    const imaginary = this.r * numeral.i + this.i * numeral.r

    return new Numeral(real, imaginary)
  }

  /**
   * Checks if two numerals are equal.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} numeral - Numeral to compare.
   * @returns {Boolean} - True if the numerals are equal, false otherwise.
   * @static
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  equals(numeral) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    return this.r === numeral.r && this.i === numeral.i
  }

  /**
   * Checks if the number is an integer.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Boolean} - True if the number is an integer, false otherwise.
   */
  isInteger() {
    return Number.isInteger(this.r) && this.i === 0
  }

  /**
   * Checks if the number is real.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Boolean} - True if the number is real, false otherwise.
   */
  isReal() {
    return this.i === 0
  }

  /**
   * Checks if the number is complex.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Boolean} - True if the number is complex, false otherwise.
   */
  isComplex() {
    return this.i !== 0
  }

  /**
   * Computes the conjugate of the complex number.
   * The conjugate of a complex number is the number with the same real part
   * and an imaginary part equal in magnitude but opposite in sign.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Numeral} - Conjugate of the complex number.
   */
  conjugate() {
    return new Numeral(this.r, -this.i)
  }

  /**
   * Generates a random Numeral.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {String} type - Type of the Numeral.
   * @returns {Numeral} - Random Numeral.
   * @static
   * @throws {RangeError} - Invalid type.
   */
  static random(type = 'natural') {
    const signReal = Math.random() < 0.5 ? -1 : 1
    const signImaginary = Math.random() < 0.5 ? -1 : 1

    switch (type) {
      case 'natural': {
        return new Numeral(signReal * Math.floor(Math.random() * 100))
      }
      case 'real': {
        return new Numeral(signReal * Math.random() * 100)
      }
      case 'imaginary-integer': {
        return new Numeral(0, signImaginary * Math.floor(Math.random() * 100))
      }
      case 'imaginary-decimal': {
        return new Numeral(0, signImaginary * Math.random() * 100)
      }
      case 'complex-integer': {
        return new Numeral(
          signReal * Math.floor(Math.random() * 100),
          signImaginary * Math.floor(Math.random() * 100)
        )
      }
      case 'complex-decimal': {
        return new Numeral(
          signReal * Math.random() * 100,
          signImaginary * Math.random() * 100
        )
      }
      default: {
        throw new RangeError('Invalid type.')
      }
    }
  }

  /**
   * Creates a linear interpolation between two numerals.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} a - First numeral.
   * @param {Numeral} b - Second numeral.
   * @param {Numeral} t - Interpolation factor.
   * @returns {Numeral} - Interpolated numeral.
   * @static
   * @throws {TypeError} - Arguments must be instances of Numeral.
   * @throws {RangeError} - Interpolation factor must be between 0 and 1.
   * @throws {TypeError} - Interpolation factor must be real.
   */
  static linearInterpolation(a, b, t) {
    if (!(a instanceof Numeral) || !(b instanceof Numeral) || !(t instanceof Numeral)) {
      throw new TypeError('Arguments must be instances of Numeral.')
    } else if (!t.isReal()) {
      throw new TypeError('Interpolation factor must be real.')
    } else if (t.r < 0 || t.r > 1) {
      throw new RangeError('Interpolation factor must be between 0 and 1.')
    }

    return a.add(b.subtract(a).multiply(t))
  }
}
