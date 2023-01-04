import util from 'node:util'
import { AssertionError } from 'node:assert'

import { Numeral, Matrix } from '#classes'


/**
 * This class represents a vector. Its value is an array of Numeral.
 *
 * @typedef {object} Vector
 * @property {Numeral[]} vector - Array of Numeral.
 * @property {number} size - Size of the vector.
 */

/**
 * This class represents a vector. Its value is an array of Numeral.
 */
export class Vector {
  /**
   * @param {Numeral[]} vector - Array of Numeral.
   */
  constructor(vector = []) {
    /**
     * The vector itself.
     *
     * @readonly
     * @type {Numeral[]}
     */
    this.vector = vector
    /**
     * Size of the vector.
     *
     * @readonly
     * @type {number}
     */
    this.size = vector.length
  }

  /**
   * Returns a string representation of the vector.
   *
   * @returns {string} - String representation of the vector.
   */
  [util.inspect.custom]() {
    /* c8 ignore start */
    return `[${this.vector
      .map((numeral) => numeral[util.inspect.custom]())
      .join(', ')}]`
    /* c8 ignore stop */
  }

  /**
   * Adds two vectors.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} vector - Vector to add.
   * @returns {Vector} - Result of the addition.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @throws {TypeError} - Argument must be an instance of Vector.
   */
  add(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    }

    const result = []

    for (let index = 0; index < this.size; index++) {
      result.push(this.vector[index].add(vector.vector[index]))
    }

    return new Vector(result)
  }

  /**
   * Subtracts two vectors.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} vector - Vector to subtract.
   * @returns {Vector} - Result of the subtraction.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @throws {TypeError} - Argument must be an instance of Vector.
   */
  subtract(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    }

    const result = []

    for (let index = 0; index < this.size; index++) {
      result.push(this.vector[index].subtract(vector.vector[index]))
    }

    return new Vector(result)
  }

  /**
   * Checks if two vectors are equal.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} vector - Vector to compare.
   * @returns {boolean} - True if vectors are equal, false otherwise.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @throws {TypeError} - Argument must be an instance of Vector.
   */
  equals(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    }

    for (let index = 0; index < this.size; index++) {
      if (!this.vector[index].equals(vector.vector[index])) {
        return false
      }
    }

    return true
  }

  /**
   * Multiplies a vector by a scalar.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Numeral} scalar - Numeral to scale with.
   * @returns {Vector} - Result of the scaling.
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  scale(scalar) {
    if (!(scalar instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    const result = []

    for (let index = 0; index < this.size; index++) {
      result.push(this.vector[index].multiply(scalar))
    }

    return new Vector(result)
  }

  /**
   * Computes the multiplication reduction of a vector.
   * This is equivalent to multiplying all the elements of the vector.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Numeral} - Result of the multiplication reduction.
   * @throws {AssertionError} - Vector must not be empty.
   */
  productReduce() {
    if (this.size === 0) {
      throw new AssertionError({ message: 'Vector must not be empty.' })
    }

    return this.vector.reduce(
      (result, value) => result.multiply(value),
      new Numeral(1)
    )
  }

  /**
   * Converts a vector to a matrix.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Number} rows - Number of rows.
   * @param {Number} columns - Number of columns.
   * @returns {Matrix} - Matrix representation of the vector.
   * @throws {TypeError} - Dimensions of the target matrix must be integers.
   * @throws {RangeError} - Dimensions of the target matrix must be positive integers.
   * @throws {AssertionError} - The product of the target matrix dimensions must be equal to the size of the vector.
   */
  toMatrix(rows = 0, columns = 0) {
    if (this.size === 0) {
      return new Matrix()
    }

    if (!Number.isInteger(rows) || !Number.isInteger(columns)) {
      throw new TypeError('Dimensions of the target matrix must be integers.')
    } else if (rows <= 0 || columns <= 0) {
      throw new RangeError('Dimensions of the target matrix must be positive integers.')
    } else if (rows * columns !== this.size) {
      throw new AssertionError({ message: 'The product of the target matrix dimensions must be equal to the size of the vector.' })
    }

    const matrix = []

    for (let row = 0; row < rows; row++) {
      const vector = []

      for (let column = 0; column < columns; column++) {
        vector.push(this.vector[row * columns + column])
      }

      matrix.push(new Vector(vector))
    }

    return new Matrix(matrix)
  }

  /**
   * Generates a random vector of size `size`.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Number} size - Size of the vector.
   * @param {String} type - Type of random numerals.
   * @static
   * @returns {Vector} - Random vector.
   * @throws {TypeError} - Size must be an integer.
   */
  static random(size, type = 'natural') {
    if (!Number.isInteger(size)) {
      throw new TypeError('Size must be an integer.')
    } else if (size <= 0) {
      throw new AssertionError({ message: 'Size must be a positive integer.' })
    }

    const vector = []

    for (let index = 0; index < size; index++) {
      vector.push(Numeral.random(type))
    }

    return new Vector(vector)
  }

  /**
   * Generates a vector of size `size` with all elements equal to `value`.
   * If `value` is not provided, the vector will be filled with zeroes.
   * If `value` is a number, the vector will be filled with numerals of that value.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Number} size - Size of the vector.
   * @param {Numeral} value - Value to fill the vector with.
   * @returns {Vector} - Vector filled with `value`.
   * @static
   * @throws {TypeError} - Size must be an integer.
   * @throws {AssertionError} - Size must be a positive integer.
   */
  static initialize(size, value = new Numeral(0)) {
    if (!Number.isInteger(size)) {
      throw new TypeError('Size must be an integer.')
    } else if (size <= 0) {
      throw new AssertionError({ message: 'Size must be a positive integer.' })
    }

    const vector = []

    for (let index = 0; index < size; index++) {
      vector.push(value)
    }

    return new Vector(vector)
  }

  /**
   * Creates a linear interpolation between two vectors.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} a - First vector.
   * @param {Vector} b - Second vector.
   * @param {Numeral} t - Interpolation factor.
   * @returns {Vector} - Interpolated vector.
   * @static
   * @throws {TypeError} - Arguments must be instances of Vector.
   * @throws {TypeError} - Interpolation factor must be an instance of Numeral.
   * @throws {RangeError} - Interpolation factor must be between 0 and 1.
   * @throws {TypeError} - Interpolation factor must be real.
   */
  static lerp(a, b, t) {
    if (!(a instanceof Vector) || !(b instanceof Vector)) {
      throw new TypeError('Arguments must be instances of Vector.')
    } else if (!(t instanceof Numeral)) {
      throw new TypeError('Interpolation factor must be an instance of Numeral.')
    } else if (!t.isReal()) {
      throw new TypeError('Interpolation factor must be real.')
    } else if (t.r < 0 || t.r > 1) {
      throw new RangeError('Interpolation factor must be between 0 and 1.')
    }

    return a.add(b.subtract(a).scale(t))
  }
}
