import util from 'node:util'
import { AssertionError } from 'node:assert'

import { Numeral, Vector } from '#classes'


/**
 * This class represents a matrix. Its value is an array of Vector.
 *
 * @typedef {Object} Matrix
 * @property {Vector[]} matrix - Array of Vector.
 * @property {Number} rows - Number of rows.
 * @property {Number} columns - Number of columns.
 * @property {Number[]} shape - Shape of the matrix.
 */

/**
 * This class represents a matrix. Its value is an array of Vector.
 */
export class Matrix {
  /**
   * @param {Vector[]} matrix - Array of Vector.
   */
  constructor(matrix = []) {
    /**
     * The matrix itself.
     *
     * @readonly
     * @type {Vector[]}
     */
    this.matrix = matrix
    /**
     * Number of rows.
     *
     * @readonly
     * @type {Number}
     */
    /* c8 ignore next */
    this.rows = matrix?.length ?? 0
    /**
     * Number of columns.
     *
     * @readonly
     * @type {Number}
     */
    this.columns = matrix?.at(0)?.size ?? 0
    /**
     * Shape of the matrix.
     *
     * @readonly
     * @type {Vector}
     */
    this.shape = [this.rows, this.columns]
  }

  /**
   * Returns a string representation of the matrix.
   *
   * @returns {String} - String representation of the matrix.
   */
  [util.inspect.custom]() {
    /* c8 ignore start */
    if (this.rows === 0 || this.columns === 0) {
      return '[]'
    }

    const rows = this.matrix.map((vector) => vector.vector)
    const columns = rows[0].map((value, index) => rows.map((row) => row[index]))
    const aligned = columns.map((column) =>
      column.map((numeral) => numeral[util.inspect.custom]())
    )

    const maxLengths = aligned.map((column) =>
      // eslint-disable-next-line unicorn/no-array-reduce
      column.reduce((maxLength, numeral) => {
        return numeral.length > maxLength ? numeral.length : maxLength
      }, 0)
    )
    const alignedColumns = aligned.map((column, index) =>
      column.map((numeral) => numeral.padEnd(maxLengths[index]))
    )
    const alignedRows = alignedColumns[0].map((_, index) =>
      alignedColumns.map((column) => column[index])
    )
    const alignedMatrix = alignedRows.map((row) => `[${row.join(', ')}]`)
    return alignedMatrix.join('\n')
    /* c8 ignore stop */
  }

  /**
   * Adds two matrices.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Matrix} matrix - Matrix to add.
   * @returns {Matrix} - Result of the addition.
   * @throws {AssertionError} - Matrices must be of the same shape.
   * @throws {TypeError} - Argument must be an instance of Matrix.
   */
  add(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (JSON.stringify(matrix.shape) !== JSON.stringify(this.shape)) {
      throw new AssertionError({
        message: 'Matrices must be of the same shape.'
      })
    }

    const result = this.matrix.map((vector, index) =>
      vector.add(matrix.matrix[index])
    )

    return new Matrix(result)
  }

  /**
   * Subtracts two matrices.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Matrix} matrix - Matrix to subtract.
   * @returns {Matrix} - Result of the subtraction.
   * @throws {AssertionError} - Matrices must be of the same shape.
   * @throws {TypeError} - Argument must be an instance of Matrix.
   */
  subtract(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (JSON.stringify(matrix.shape) !== JSON.stringify(this.shape)) {
      throw new AssertionError({
        message: 'Matrices must be of the same shape.'
      })
    }

    const result = this.matrix.map((vector, index) =>
      vector.subtract(matrix.matrix[index])
    )

    return new Matrix(result)
  }

  /**
   * Checks if two matrices are equal.
   * Two matrices are equal if they have the same shape and the same values.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Matrix} matrix - Matrix to compare.
   * @returns {Boolean} - True if the matrices are equal, false otherwise.
   * @throws {AssertionError} - Matrices must be of the same shape.
   * @throws {TypeError} - Argument must be an instance of Matrix.
   */
  equals(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (JSON.stringify(matrix.shape) !== JSON.stringify(this.shape)) {
      throw new AssertionError({
        message: 'Matrices must be of the same shape.'
      })
    }

    return this.matrix.every((vector, index) =>
      vector.equals(matrix.matrix[index])
    )
  }

  /**
   * Scales a matrix.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Numeral} numeral - Numeral to scale the matrix with.
   * @returns {Matrix} - Result of the scaling.
   * @throws {TypeError} - Argument must be an instance of Numeral.
   */
  scale(numeral) {
    if (!(numeral instanceof Numeral)) {
      throw new TypeError('Argument must be an instance of Numeral.')
    }

    const result = this.matrix.map((vector) => vector.scale(numeral))

    return new Matrix(result)
  }

  /**
   * Check if the matrix is square.
   *
   * @description Space complexity: O(1), time complexity: O(1).
   * @returns {Boolean} - True if the matrix is square, false otherwise.
   */
  isSquare() {
    return this.rows === this.columns
  }

  /**
   * Converts a matrix to a vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Vector} - Vector representation of the matrix.
   */
  toVector() {
    return new Vector(this.matrix.map((vector) => vector.vector).flat())
  }

  /**
   * Generates a random matrix of shape `rows` * `columns`.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Number} rows - Number of rows.
   * @param {Number} columns - Number of columns.
   * @param {String} type - Type of the random numerals.
   * @static
   * @returns {Matrix} - Random matrix.
   * @throws {AssertionError} - Dimensions must be positive integers.
   */
  static random(rows, columns, type = "natural") {
    const matrix = []

    if (!Number.isInteger(rows) || !Number.isInteger(columns)) {
      throw new TypeError('Dimensions must be integers.')
    } else if (rows <= 0 || columns <= 0) {
      throw new AssertionError({
        message: 'Dimensions must be positive integers.'
      })
    }

    for (let row = 0; row < rows; row++) {
      matrix.push(Vector.random(columns, type))
    }

    return new Matrix(matrix)
  }

  /**
   * Computes the linear combination of a matrix and a vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Matrix} matrix - Matrix to compute the linear combination of.
   * @param {Vector} vector - Each element of this vector is used to scale its corresponding row index within the matrix.
   * @returns {Vector} - Result of the linear combination.
   * @static
   * @throws {AssertionError} - Matrix rows and vector size must be equal.
   * @throws {TypeError} - First argument must be an instance of Matrix, second argument must be an instance of Vector.
   */
  static linearCombination(matrix, vector) {
    if (!(matrix instanceof Matrix) || !(vector instanceof Vector)) {
      throw new TypeError('First argument must be an instance of Matrix, second argument must be an instance of Vector.')
    } else if (matrix.rows !== vector.size) {
      throw new AssertionError({ message: 'Matrix rows and vector size must be equal.' })
    }

    const { vector: scaleVector } = vector
    const { matrix: matrixRows } = matrix

    return matrixRows.reduce((result, row, index) => {
      return result.add(row.scale(scaleVector[index]))
    }, Vector.initialize(matrix.columns))
  }

  /**
   * Creates a linear interpolation between two matrices.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Matrix} a - First matrix.
   * @param {Matrix} b - Second matrix.
   * @param {Numeral} t - Interpolation factor.
   * @returns {Matrix} - Interpolated matrix.
   * @static
   * @throws {TypeError} - Arguments must be instances of Matrix.
   * @throws {TypeError} - Interpolation factor must be an instance of Numeral.
   * @throws {RangeError} - Interpolation factor must be between 0 and 1.
   * @throws {TypeError} - Interpolation factor must be real.
   * @throws {AssertionError} - Matrices must be of the same shape.
   */
  static linearInterpolation(a, b, t) {
    if (!(a instanceof Matrix) || !(b instanceof Matrix)) {
      throw new TypeError('Arguments must be instances of Matrix.')
    } else if (!(t instanceof Numeral)) {
      throw new TypeError(
        'Interpolation factor must be an instance of Numeral.'
      )
    } else if (!t.isReal()) {
      throw new TypeError('Interpolation factor must be real.')
    } else if (t.r < 0 || t.r > 1) {
      throw new RangeError('Interpolation factor must be between 0 and 1.')
    } else if (JSON.stringify(a.shape) !== JSON.stringify(b.shape)) {
      throw new AssertionError({
        message: 'Matrices must be of the same shape.'
      })
    }

    return a.add(b.subtract(a).scale(t))
  }
}