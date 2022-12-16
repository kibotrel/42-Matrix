import util from 'node:util'

import { Numeral } from '#classes'

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
    return `[${this.vector
      .map((numeral) => numeral[util.inspect.custom]())
      .join(', ')}]`
  }

  /**
   * Adds two vectors.
   *
   * @param {Vector} vector - Vector to add.
   * @returns {Vector} - Result of the addition.
   * @throws {Error} - Vectors must be of the same size.
   * @throws {Error} - Argument must be an instance of Vector.
   */
  add(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new Error('Vectors must be of the same size.')
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
   * @param {Vector} vector - Vector to subtract.
   * @returns {Vector} - Result of the subtraction.
   * @throws {Error} - Vectors must be of the same size.
   * @throws {Error} - Argument must be an instance of Vector.
   */
  subtract(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new Error('Vectors must be of the same size.')
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
   * @param {Vector} vector - Vector to compare.
   * @returns {boolean} - True if vectors are equal, false otherwise.
   * @throws {Error} - Vectors must be of the same size.
   * @throws {Error} - Argument must be an instance of Vector.
   */
  equals(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new Error('Vectors must be of the same size.')
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
   * @param {Numeral} scalar - Numeral to scale with.
   * @returns {Vector} - Result of the scaling.
   * @throws {Error} - Argument must be an instance of Numeral.
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
   * Generates a random vector of size `size`.
   *
   * @param {number} size - Size of the vector.
   * @param {string} type - Type of the vector.
   * @returns {Vector} - Random vector.
   * @throws {Error} - Size must be a positive integer.
   */
  static random(size, type = 'natural') {
    if (typeof size !== 'number' || size <= 0 || size % 1 !== 0) {
      throw new TypeError('Size must be a positive integer.')
    }

    const vector = []

    for (let index = 0; index < size; index++) {
      vector.push(Numeral.random(type))
    }

    return new Vector(vector)
  }
}
