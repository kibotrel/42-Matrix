import util from 'node:util'

import { Numeral, Vector } from '#classes'

/**
 * This class represents a matrix. Its value is an array of Vector.
 *
 * @typedef {object} Matrix
 * @property {Vector[]} matrix - Array of Vector.
 * @property {number} rows - Number of rows.
 * @property {number} columns - Number of columns.
 * @property {Vector} shape - Shape of the matrix.
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
     * @type {number}
     */
    this.rows = matrix?.length ?? 0
    /**
     * Number of columns.
     *
     * @readonly
     * @type {number}
     */
    this.columns = matrix?.at(0)?.size ?? 0
    /**
     * Shape of the matrix.
     *
     * @readonly
     * @type {Vector}
     */
    this.shape = new Vector([new Numeral(this.rows), new Numeral(this.columns)])
  }

  /**
   * Returns a string representation of the matrix.
   *
   * @returns {string} - String representation of the matrix.
   */
  [util.inspect.custom]() {
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
  }

  /**
   * Adds two matrices.
   *
   * @param {Matrix} matrix - Matrix to add.
   * @returns {Matrix} - Result of the addition.
   * @throws {Error} - Matrices must be of the same shape.
   * @throws {Error} - Argument must be an instance of Matrix.
   */
  add(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (!this.shape.equals(matrix.shape)) {
      throw new Error('Matrices must be of the same shape.')
    }

    const result = this.matrix.map((vector, index) =>
      vector.add(matrix.matrix[index])
    )

    return new Matrix(result)
  }

  /**
   * Subtracts two matrices.
   *
   * @param {Matrix} matrix - Matrix to subtract.
   * @returns {Matrix} - Result of the subtraction.
   * @throws {Error} - Matrices must be of the same shape.
   * @throws {Error} - Argument must be an instance of Matrix.
   */
  subtract(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (!this.shape.equals(matrix.shape)) {
      throw new Error('Matrices must be of the same shape.')
    }

    const result = this.matrix.map((vector, index) =>
      vector.subtract(matrix.matrix[index])
    )

    return new Matrix(result)
  }

  equals(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (!this.shape.equals(matrix.shape)) {
      throw new Error('Matrices must be of the same shape.')
    }

    return this.matrix.every((vector, index) =>
      vector.equals(matrix.matrix[index])
    )
  }

  /**
   * Scales a matrix.
   *
   * @param {Numeral} numeral - Numeral to scale the matrix with.
   * @returns {Matrix} - Result of the scaling.
   * @throws {Error} - Argument must be an instance of Numeral.
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
   * @returns {boolean} - True if the matrix is square, false otherwise.
   */
  isSquare() {
    return this.rows === this.columns
  }
}
