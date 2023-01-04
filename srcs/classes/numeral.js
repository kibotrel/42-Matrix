import util from 'node:util'

import chalk from 'chalk'

import { fixDecimals } from '#utils'

/**
 * This is a number container. You can store both real and complex numbers in it.
 *
 * @typedef {object} Numeral
 * @property {number} r - Real part of the number.
 * @property {number} i - Imaginary part of the number.
 */

/**
 * This class in a number container. You can store both real and complex numbers in it.
 */
export class Numeral {
  /**
   * @param {number} real - Real part of the number.
   * @param {number} imaginary - Imaginary part of the number.
   */
  constructor(real = 0, imaginary = 0) {
    /**
     * Real part of the number.
     *
     * @readonly
     * @type {number}
     */
    this.r = real
    /**
     * Imaginary part of the number.
     *
     * @readonly
     * @type {number}
     */
    this.i = imaginary
  }

  /**
   * Returns a string representation of the number.
   *
   * @returns {string} - String representation of the number.
   */
  [util.inspect.custom]() {
    const real = fixDecimals(this.r)
    const imaginary = fixDecimals(this.i)

    if (imaginary === 0) {
      return chalk.yellow(`${real}`)
    } else if (real === 0) {
      return chalk.yellow(
        `${imaginary !== 1 && imaginary !== -1 ? imaginary : ''}i`
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
  }

  /**
   * Adds two numerals.
   *
   * @param {Numeral} numeral - Numeral to add.
   * @returns {Numeral} - Result of the addition.
   * @throws {Error} - Argument must be an instance of Numeral.
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
   * @param {Numeral} numeral - Numeral to subtract.
   * @returns {Numeral} - Result of the subtraction.
   * @throws {Error} - Argument must be an instance of Numeral.
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
   * @param {Numeral} numeral - Numeral to multiply.
   * @returns {Numeral} - Result of the multiplication.
   * @throws {Error} - Argument must be an instance of Numeral.
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
   * @param {Numeral} numeral - Numeral to compare.
   * @returns {boolean} - True if the numerals are equal, false otherwise.
   * @static
   * @throws {Error} - Argument must be an instance of Numeral.
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
   * @returns {boolean} - True if the number is an integer, false otherwise.
   */
  isInteger() {
    return Number.isInteger(this.r) && this.i === 0
  }

  /**
   * Checks if the number is real.
   *
   * @returns {boolean} - True if the number is real, false otherwise.
   */
  isReal() {
    return this.i === 0
  }

  /**
   * Checks if the number is complex.
   *
   * @returns {boolean} - True if the number is complex, false otherwise.
   */
  isComplex() {
    return this.i !== 0
  }

  /**
   * Generates a random Numeral.
   *
   * @param {string} type - Type of the Numeral.
   * @returns {Numeral} - Random Numeral.
   * @static
   * @throws {Error} - Invalid type.
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
        throw new Error('Invalid type.')
      }
    }
  }
}
