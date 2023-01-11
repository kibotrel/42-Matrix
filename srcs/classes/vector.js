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
   * @see https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects|util.inspect.custom
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

    return new Vector(
      this.vector.map(
        (numeral, index) => numeral.add(vector.vector[index])
      )
    )
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

    return new Vector(
      this.vector.map(
        (numeral, index) => numeral.subtract(vector.vector[index])
      )
    )
  }

  /**
   * Checks if two vectors are equal.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} vector - Vector to compare.
   * @returns {Boolean} - True if vectors are equal, false otherwise.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @throws {TypeError} - Argument must be an instance of Vector.
   */
  equals(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    }

    return this.vector.every(
      (numeral, index) => numeral.equals(vector.vector[index])
    )
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

    return new Vector(
      this.vector.map((numeral) => numeral.multiply(scalar))
    )
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
      throw new RangeError(
        'Dimensions of the target matrix must be positive integers.'
      )
    } else if (rows * columns !== this.size) {
      throw new AssertionError({
        message: 'The product of the target matrix dimensions must be equal to the size of the vector.'
      })
    }

    const matrixRows = []

    this.vector.forEach((numeral, index) => {
      const matrixRow = Math.floor(index / columns)

      if (index % columns === 0) {
        matrixRows.push(Vector.initialize(columns))
      }

      matrixRows[matrixRow].vector[index % columns] = numeral
    })

    return new Matrix(matrixRows)
  }

  /**
   * Computes the inner product of two vectors.
   * This is equivalent to multiplying the two vectors and summing the result.
   * This is also equivalent to the dot product of two vectors extended to
   * complex numbers.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} vector - Vector to compute the inner product with.
   * @returns {Numeral} - Result of the inner product.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @throws {TypeError} - Argument must be an instance of Vector.
   * @throws {AssertionError} - Vector must not be empty.
   * @see https://college.cengage.com/mathematics/larson/elementary_linear/4e/shared/downloads/c08s4.pdf
   */
  innerProduct(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    } else if (this.size === 0) {
      throw new AssertionError({ message: 'Vectors must not be empty.' })
    }

    return this.vector.reduce(
      (result, numeral, index) =>
        result.add(numeral.multiply(vector.vector[index].conjugate())),
      new Numeral(0)
    )
  }

  /**
 * Computes the dot product of two vectors.
 * This is equivalent to multiplying the two vectors and summing the result.
 * 
 * @description Space complexity: O(n), time complexity: O(n).
 * @param {Vector} vector - Vector to compute the dot product with.
 * @returns {Numeral} - Result of the dot product.
 * @throws {AssertionError} - Vectors must be of the same size.
 * @throws {TypeError} - Argument must be an instance of Vector.
 * @throws {TypeError} - Non-real numbers are not supported, use innerProduct instead.
 * @throws {AssertionError} - Vector must not be empty.
 * @see https://en.wikipedia.org/wiki/Dot_product
 */
  dotProduct(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.size !== vector.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    } else if (this.size === 0) {
      throw new AssertionError({ message: 'Vectors must not be empty.' })
    }

    return this.vector.reduce(
      (result, numeral, index) =>
        result.add(numeral.multiply(vector.vector[index])),
      new Numeral(0)
    )
  }

  /**
   * Computes the Manhattan distance of a vector.
   * This is equivalent to summing the absolute values of the vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Numeral} - Result of the Manhattan distance.
   * @see https://montjoile.medium.com/l0-norm-l1-norm-l2-norm-l-infinity-norm-7a7d18a4f40c
   */
  manhattanDistance() {
    return this.vector.reduce(
      (result, numeral) => result.add(numeral.absolute()),
      new Numeral(0)
    )
  }

  /**
   * Computes the Euclidean norm of a vector.
   * This is equivalent to the square root of the sum of the squares of the
   * vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Numeral} - Result of the Euclidean norm.
   * @see https://montjoile.medium.com/l0-norm-l1-norm-l2-norm-l-infinity-norm-7a7d18a4f40c
   */
  euclideanNorm() {
    return this.vector.reduce(
      (result, numeral) => result.add(numeral.multiply(numeral)),
      new Numeral(0)
    ).squareRoot()
  }

  /**
   * Computes the supremum norm of a vector.
   * This is equivalent to the maximum absolute value of the vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Numeral} - Result of the supremum norm.
   * @see https://montjoile.medium.com/l0-norm-l1-norm-l2-norm-l-infinity-norm-7a7d18a4f40c
   */
  supremumNorm() {
    return this.vector.reduce(
      (result, numeral) => {
        const absolute = numeral.absolute()

        return absolute.r > result.r ? absolute : result
      },
      new Numeral(0)
    )
  }

  /**
   * Clone the vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Vector} - Cloned vector.
   * @see https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
   */
  clone() {
    return new Vector(this.vector.map(numeral => numeral.clone()))
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

    return new Vector(
      Array.from({ length: size }, () => Numeral.random(type))
    )
  }

  /**
   * Generates a vector of size `size` with all elements equal to `value`.
   * If `value` is not provided, the vector will be filled with zeroes.
   * If `value` is a number, the vector will be filled with numerals of
   * that value.
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

    return new Vector(new Array(size).fill(value))
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
   * @throws {AssertionError} - Vectors must be of the same size.
   */
  static linearInterpolation(a, b, t) {
    if (!(a instanceof Vector) || !(b instanceof Vector)) {
      throw new TypeError('Arguments must be instances of Vector.')
    } else if (!(t instanceof Numeral)) {
      throw new TypeError(
        'Interpolation factor must be an instance of Numeral.'
      )
    } else if (!t.isReal()) {
      throw new TypeError('Interpolation factor must be real.')
    } else if (t.r < 0 || t.r > 1) {
      throw new RangeError('Interpolation factor must be between 0 and 1.')
    } else if (a.size !== b.size) {
      throw new AssertionError({ message: 'Vectors must be of the same size.' })
    }

    return a.add(b.subtract(a).scale(t))
  }

  /**
   * Computes the cosine of the angle between two vectors.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} a - First vector.
   * @param {Vector} b - Second vector.
   * @returns {Numeral} - Cosine of the angle between the two vectors.
   * @static
   * @throws {TypeError} - Arguments must be instances of Vector.
   * @throws {AssertionError} - Vectors must be of at least size 2.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @throws {AssertionError} - Vectors must not be zero vectors.
   * @see https://onlinemschool.com/math/library/vector/angl/
   * @see https://towardsdatascience.com/understanding-cosine-similarity-and-its-application-fd42f585296a
   * @see https://www.researchgate.net/post/How_can_I_calculate_the_angle_between_two_complex_vectors
   */
  static cosine(a, b) {
    if (!(a instanceof Vector) || !(b instanceof Vector)) {
      throw new TypeError('Arguments must be instances of Vector.')
    } else if (a.size !== b.size) {
      throw new AssertionError({
        message: 'Vectors must be of the same size.'
      })
    } else if (a.size < 2 || b.size < 2) {
      throw new AssertionError({
        message: 'Vectors must be of at least size 2.'
      })
    } else if (
      a.vector.every((numeral) => numeral.isZero()) ||
      b.vector.every((numeral) => numeral.isZero())
    ) {
      throw new AssertionError({
        message: 'Vectors must not be zero vectors.'
      })
    }

    return a.innerProduct(b).divide(a.euclideanNorm().multiply(b.euclideanNorm()))
  }

  /**
   * Computes the cross product of two vectors.
   * 
   * @description Space complexity: O(1), time complexity: O(1).
   * @param {Vector} a - First vector.
   * @param {Vector} b - Second vector.
   * @returns {Vector} - Cross product of the two vectors.
   * @static
   * @throws {TypeError} - Arguments must be instances of Vector.
   * @throws {AssertionError} - Vectors must be of size 3.
   * @throws {AssertionError} - Vectors must be of the same size.
   * @see https://www.mathsisfun.com/algebra/vectors-cross-product.html
   */
  static crossProduct(a, b) {
    if (!(a instanceof Vector) || !(b instanceof Vector)) {
      throw new TypeError('Arguments must be instances of Vector.')
    } else if (a.size !== b.size) {
      throw new AssertionError({
        message: 'Vectors must be of the same size.'
      })
    } else if (a.size !== 3 || b.size !== 3) {
      throw new AssertionError({
        message: 'Vectors must be of size 3.'
      })
    }

    const x = a.vector.at(1)
      .multiply(b.vector.at(2))
      .subtract(
        a.vector.at(2).multiply(b.vector.at(1))
      )
    const y = a.vector.at(2)
      .multiply(b.vector.at(0))
      .subtract(
        a.vector.at(0).multiply(b.vector.at(2))
      )
    const z = a.vector.at(0)
      .multiply(b.vector.at(1))
      .subtract(
        a.vector.at(1).multiply(b.vector.at(0))
      )

    return new Vector([x, y, z])
  }
}
