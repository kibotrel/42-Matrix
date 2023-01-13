import util from 'node:util'

import chalk from 'chalk'

import { fixDecimals, abs } from '#utils'

/**
 * This is a number container. You can store both real 
 * and complex numbers in it.
 *
 * @typedef {Object} Numeral
 * @property {Number} r - Real part of the number.
 * @property {Number} i - Imaginary part of the number.
 */

/**
 * This class in a number container. You can store both real
 * and complex numbers in it.
 */
export class Numeral {
  /**
   * @param {Number} real - Real part of the number.
   * @param {Number} imaginary - Imaginary part of the number.
   */
  constructor(real = 0, imaginary = 0) {
    /**
     * Real part of the number.
     * The comparison is done to mitigate IEEE 754 floating point errors.
     *
     * @readonly
     * @type {Number}
     */
    this.r = abs(real) > 1e-12 ? real : 0
    /**
     * Imaginary part of the number.
     * The comparison is done to mitigate IEEE 754 floating point errors.
     *
     * @readonly
     * @type {Number}
     */
    this.i = abs(imaginary) > 1e-12 ? imaginary : 0
  }

  /**
   * Returns a string representation of the number.
   *
   * @returns {String} - String representation of the number.
   * @see https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects
   */
  [util.inspect.custom]() {
    /* c8 ignore start */
    const real = fixDecimals(this.r)
    const imaginary = fixDecimals(this.i)

    if (imaginary === 0) {
      return chalk.yellow(`${real}`)
    } else if (real === 0) {
      return chalk.yellow(
        `${imaginary !== 1 && imaginary !== -1 ?
          imaginary : imaginary === -1 ? '-' : ''}i`
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
   * Divides two numerals.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} numeral - Numeral to divide.
   * @returns {Numeral} - Result of the division.
   * @throws {TypeError} - Argument must be an instance of Numeral.
   * @throws {RangeError} - Cannot divide by zero.
   */
  divide(numeral) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    } else if (numeral.r === 0 && numeral.i === 0) {
      throw new RangeError('Cannot divide by zero.')
    }

    const denominator = numeral.r * numeral.r + numeral.i * numeral.i
    const real = (this.r * numeral.r + this.i * numeral.i) / denominator
    const imaginary = (this.i * numeral.r - this.r * numeral.i) / denominator

    return new Numeral(real, imaginary)
  }

  /**
   * Checks if two numerals are equal.
   *
   * @description Space complexity: O(1), Time complexity: O(1).
   * @param {Numeral} numeral - Numeral to compare.
   * @param {Number} precision - Decimal precision of the comparison.
   * @returns {Boolean} - True if the numerals are equal, false otherwise.
   * @static
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  equals(numeral, precision = 12) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    const r1 = fixDecimals(this.r, precision)
    const i1 = fixDecimals(this.i, precision)
    const r2 = fixDecimals(numeral.r, precision)
    const i2 = fixDecimals(numeral.i, precision)

    return r1 === r2 && i1 === i2
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
   * Checks if the number is zero.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Boolean} - True if the number is zero, false otherwise.
   */
  isZero() {
    return this.r === 0 && this.i === 0
  }

  /**
   * Computes the conjugate of the complex number.
   * The conjugate of a complex number is the number with the same real part
   * and an imaginary part equal in magnitude but opposite in sign.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Numeral} - Conjugate of the complex number.
   * @see https://en.wikipedia.org/wiki/Complex_conjugate
   */
  conjugate() {
    return new Numeral(this.r, -this.i)
  }

  /**
   * Computes the absolute value of the numeral.
   * The absolute value of a complex number is the distance from the origin
   * to the point on the complex plane corresponding to the complex number.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Numeral} - Absolute value of the numeral.
   * @see https://www2.clarku.edu/faculty/djoyce/complex/abs.html#:~:text=For%20a%20complex%20number%20z,on%20the%20real%20number%20line.
   */
  absolute() {
    return new Numeral(this.r * this.r + this.i * this.i).squareRoot()
  }

  /**
   * Computes the square root of the numeral.
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Numeral} - Square root of the numeral.
   * @see https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
   * @see https://www.cuemath.com/algebra/square-root-of-complex-number/
   */
  squareRoot() {
    if (this.i === 0) {
      if (this.r === 0) {
        return new Numeral(0)
      }

      const sign = this.r < 0 ? -1 : 1
      const x = sign < 0 ? -this.r : this.r
      let y = 1

      /**
       * By definition square root must be greater than the one of the last
       * integer and lesser than the following one so we compute the nearest
       * perfect root of x to speed up the process.
       */

      while (y * y <= x) {
        y++
      }

      /**
       * Following the Babylonian algorithm iterate the following equation to
       * get closer and closer to the actual root of x: y = 0.5 * (y + x / y)
       * starting with y as the closest perfect root.
       */

      for (let i = 0; i < 10; i++) {
        y = 0.5 * (y + x / y)
      }

      /**
       * If the input number is negative we return the result as the imaginary 
       * part of a complex number. 
       */

      return sign > 0 ? new Numeral(y) : new Numeral(0, y)
    } else {
      const { r: real } = this.absolute()
        .add(new Numeral(this.r))
        .divide(new Numeral(2))
        .squareRoot()

      const { r: imaginary } = new Numeral(this.i)
        .divide(new Numeral(this.i).absolute())
        .multiply(
          this.absolute()
            .subtract(
              new Numeral(this.r))
            .divide(new Numeral(2))
            .squareRoot())

      return new Numeral(real, imaginary)
    }
  }

  /**
   * Clone the numeral
   * 
   * @description Space complexity: O(1), Time complexity: O(1).
   * @returns {Numeral} - Clone of the numeral.
   */
  clone() {
    return new Numeral(this.r, this.i)
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
   * @see https://en.wikipedia.org/wiki/Linear_interpolation
   */
  static linearInterpolation(a, b, t) {
    if (
      !(a instanceof Numeral) ||
      !(b instanceof Numeral) ||
      !(t instanceof Numeral)
    ) {
      throw new TypeError('Arguments must be instances of Numeral.')
    } else if (!t.isReal()) {
      throw new TypeError('Interpolation factor must be real.')
    } else if (t.r < 0 || t.r > 1) {
      throw new RangeError('Interpolation factor must be between 0 and 1.')
    }

    return a.add(b.subtract(a).multiply(t))
  }
}
