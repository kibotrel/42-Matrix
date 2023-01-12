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
      column.map((numeral) => numeral.padStart(maxLengths[index]))
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

    return new Matrix(
      this.matrix.map((vector, index) =>
        vector.add(matrix.matrix[index])
      )
    )
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

    return new Matrix(
      this.matrix.map((vector, index) =>
        vector.subtract(matrix.matrix[index])
      )
    )
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

    return new Matrix(
      this.matrix.map((vector) => vector.scale(numeral))
    )
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
    return new Vector(
      this.matrix.map((vector) => vector.vector).flat()
    )
  }

  /**
 * Multiply two matrices.
 * 
 * @description Space complexity: O(n), time complexity: O(n).
 * @param {Matrix} matrix - Matrix to multiply.
 * @returns {Matrix} - Result of the matrix multiplication.
 * @throws {TypeError} - Argument must be an instance of Matrix.
 * @throws {AssertionError} - Argument's rows amount and base matrix columns amount must match.
 * @see https://www.mathsisfun.com/algebra/matrix-multiplying.html
 */
  multiplyMatrix(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be an instance of Matrix.')
    } else if (this.columns !== matrix.rows) {
      throw new AssertionError({
        message: 'Argument\'s rows amount and base matrix columns amount must match.'
      })
    }

    const resultMatrix = []

    for (let row = 0; row < this.rows; row++) {
      const resultRow = []
      const v1 = this.matrix[row]

      for (let column = 0; column < matrix.columns; column++) {
        const v2 = new Vector(
          matrix.matrix.map((vector) => vector.vector[column])
        )

        resultRow.push(v1.dotProduct(v2))
      }

      resultMatrix.push(new Vector(resultRow))
    }

    return new Matrix(resultMatrix)
  }

  /**
   * Multiply a matrix by a vector.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Vector} vector - Vector to multiply.
   * @returns {Matrix} - Result of the matrix-vector multiplication.
   * @throws {TypeError} - Argument must be an instance of Vector.
   * @throws {AssertionError} - Vector size and base matrix columns amount must match.
   * @see https://www.mathsisfun.com/algebra/matrix-multiplying.html
   */
  multiplyVector(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError('Argument must be an instance of Vector.')
    } else if (this.columns !== vector.size) {
      throw new AssertionError({
        message: 'Vector size and base matrix columns amount must match.'
      })
    }

    return this.multiplyMatrix(vector.toMatrix(vector.size, 1))
  }

  /**
   * Computes the trace of the matrix.
   *
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Numeral} - Trace of the matrix.
   * @throws {AssertionError} - Matrix must be square.
   * @see https://en.wikipedia.org/wiki/Trace_(linear_algebra)
   */
  trace() {
    if (!this.isSquare()) {
      throw new AssertionError({
        message: 'Matrix must be square.'
      })
    }

    return this.matrix.reduce(
      (result, vector, index) => result.add(vector.vector.at(index)),
      new Numeral(0)
    )
  }

  /**
   * Transposes the matrix.
   * 
   * @description Space complexity: O(nm), time complexity: O(nm).
   * @returns {Matrix} - Transposed matrix.
   * @see https://en.wikipedia.org/wiki/Transpose
   */
  transpose() {
    return new Matrix(
      this.matrix.at(0).vector.map((numeral, index) =>
        new Vector(this.matrix.map((vector) =>
          vector.vector[index])
        )
      )
    )
  }

  /**
   * Clones the matrix.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @returns {Matrix} - Cloned matrix.
   * @see https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
   */
  clone() {
    return new Matrix(this.matrix.map((vector) => vector.clone()))
  }

  /**
   * Computes the reduced row echelon form of the matrix.
   * 
   * @description Space complexity: O(n²), time complexity: O(n³).
   * @returns {Matrix} - Reduced row echelon form of the matrix.
   * @see https://en.wikipedia.org/wiki/Reduced_row_echelon_form
   */
  reducedRowEchelonForm() {
    let lead = 0
    const matrix = this.clone()

    for (let row = 0; row < matrix.rows; row++) {
      if (matrix.columns <= lead) {
        return matrix
      }

      let i = row

      while (matrix.matrix[i].vector[lead].isZero()) {
        i++

        if (matrix.rows === i) {
          i = row
          lead++

          if (matrix.columns === lead) {
            return matrix
          }
        }
      }

      if (i !== row) {
        const swap = matrix.matrix[i]

        matrix.matrix[i] = matrix.matrix[row]
        matrix.matrix[row] = swap
      }

      matrix.matrix[row] = new Vector(
        matrix.matrix[row].vector.map(
          (numeral) => numeral.divide(matrix.matrix[row].vector[lead])
        )
      )

      for (let j = 0; j < this.rows; j++) {
        if (j !== row) {
          const subtractedVector = matrix.matrix[row].scale(
            matrix.matrix[j].vector[lead]
          )

          matrix.matrix[j] = matrix.matrix[j].subtract(subtractedVector)
        }
      }

      lead++
    }

    return matrix
  }

  /**
   * Computes the determinant of the matrix.
   * 
   * @description Space complexity: O(n²), time complexity: O(n³).
   * @returns {Numeral} - Determinant of the matrix.
   * @throws {AssertionError} - Matrix must be square.
   * @see https://www.cuemath.com/algebra/determinant-of-matrix/
   * @see https://en.wikipedia.org/wiki/Determinant
   * @see https://www.mathsisfun.com/algebra/matrix-determinant.html
   */
  determinant() {
    if (!this.isSquare()) {
      throw new AssertionError({
        message: 'Matrix must be square.'
      })
    }

    if (this.rows === 1) {
      /**
       * Space complexity O(1), time complexity O(1).
       */
      return this.matrix.at(0).vector.at(0)
    } else if (this.rows === 2) {
      /**
       * Space complexity O(1), time complexity O(1).
       */
      return this.matrix.at(0).vector.at(0).multiply(
        this.matrix.at(1).vector.at(1)
      ).subtract(
        this.matrix.at(0).vector.at(1).multiply(
          this.matrix.at(1).vector.at(0)
        )
      )
    } else {
      /**
       * Space complexity O(n²), time complexity O(n³).
       */

      return this.triangulation().diagonalProduct()
    }
  }

  /**
   * Computes the triangular form of the matrix using Gaussian elimination method.
   * 
   * @description Space complexity: O(n²), time complexity: O(n³).
   * @returns {Matrix} - Triangular form of the matrix.
   * @throws {AssertionError} - Matrix must be square.
   * @see https://en.wikipedia.org/wiki/Gaussian_elimination
   */
  triangulation() {
    if (!this.isSquare()) {
      throw new AssertionError({
        message: 'Matrix must be square.'
      })
    }

    const matrix = this.clone()

    let pivotRow = 0
    let pivotColumn = 0

    while (pivotRow < matrix.rows && pivotColumn < matrix.columns) {
      let iMax = pivotRow

      for (let i = pivotRow + 1; i < matrix.rows; i++) {
        const current = matrix.matrix.at(i).vector.at(pivotRow).absolute()
        const max = matrix.matrix.at(iMax).vector.at(pivotColumn).absolute()

        iMax = current.r > max.r ? i : iMax
      }

      if (matrix.matrix.at(iMax).vector.at(pivotColumn).isZero()) {
        pivotColumn++
      } else {
        const swap = matrix.matrix.at(pivotRow)

        matrix.matrix[pivotRow] = matrix.matrix.at(iMax)
        matrix.matrix[iMax] = swap

        for (let i = pivotRow + 1; i < matrix.rows; i++) {
          const factor = matrix.matrix.at(i).vector.at(pivotColumn).divide(
            matrix.matrix.at(pivotRow).vector.at(pivotColumn)
          )

          matrix.matrix[i].vector[pivotColumn] = new Numeral(0)

          for (let j = pivotColumn + 1; j < matrix.columns; j++) {
            matrix.matrix[i].vector[j] = matrix.matrix.at(i).vector.at(j).subtract(
              matrix.matrix.at(pivotRow).vector.at(j).multiply(factor)
            )
          }
        }
        pivotRow++
        pivotColumn++
      }
    }

    return matrix
  }

  /**
   * Computes the product of the diagonal elements of the matrix.
   * 
   * @description Space complexity: O(1), time complexity: O(n).
   * @returns {Numeral} - Product of the diagonal elements of the matrix.
   * @throws {AssertionError} - Matrix must be square.
   */
  diagonalProduct() {
    if (!this.isSquare()) {
      throw new AssertionError({
        message: 'Matrix must be square.'
      })
    }

    return this.matrix.reduce((product, vector, index) =>
      product.multiply(vector.vector.at(index).conjugate()), new Numeral(1)
    )
  }

  /**
   * Computes the inverse of this matrix.
   * 
   * @description Space complexity: O(n²), time complexity: O(n³).
   * @returns {Matrix} - Inverse of this matrix.
   * @throws {AssertionError} - Matrix must be square.
   * @throws {AssertionError} - Matrix must not be singular.
   * @see https://people.revoledu.com/kardi/tutorial/LinearAlgebra/MatrixInverseRREF.html
   */
  inverse() {
    if (!this.isSquare()) {
      throw new AssertionError({
        message: 'Matrix must be square.'
      })
    }

    if (this.determinant().isZero()) {
      throw new AssertionError({
        message: 'Matrix must not be singular.'
      })
    }

    const identity = Matrix.identityMatrix(this.rows)
    const augmented = this.augment(identity)
    const reducedRowEchelonForm = augmented.reducedRowEchelonForm()

    return new Matrix(
      reducedRowEchelonForm.matrix.map(vector => new Vector(vector.vector.slice(this.columns))))
  }

  /**
   * Computes the matrix augmentation of a pair of matrix.
   * 
   * @description Space complexity: O(n²), time complexity: O(n²).
   * @param {Matrix} matrix - Matrix to append.
   * @returns {Matrix} - Augmented matrix.
   * @throws {TypeError} - Argument must be a matrix.
   * @throws {AssertionError} - Matrices must have the same number of rows.
   * @see https://en.wikipedia.org/wiki/Matrix_(mathematics)#Augmented_matrix
   */
  augment(matrix) {
    if (!(matrix instanceof Matrix)) {
      throw new TypeError('Argument must be a matrix.')
    } else if (this.rows !== matrix.rows) {
      throw new AssertionError({
        message: 'Matrices must have the same number of rows.'
      })
    }

    return new Matrix(this.matrix.map(
      (vector, index) => new Vector([...vector.vector, ...matrix.matrix.at(index).vector])
    ))

  }

  /**
   * Returns a matrix without the specified row and column.
   * 
   * @description Space complexity: O(n²), time complexity: O(n³).
   * @param {Number} row - Row to be removed.
   * @param {Number} column - Column to be removed.
   * @returns {Matrix} - Submatrix.
   * @throws {TypeError} - Row and column must be integers.
   * @throws {AssertionError} - Row and column must be positive integers.
   * @throws {AssertionError} - Row and column must be within the matrix.
   * @see https://en.wikipedia.org/wiki/Submatrix
   */
  subMatrix(row, column) {
    if (!Number.isInteger(row) || !Number.isInteger(column)) {
      throw new TypeError('Arguments must be integers.')
    } else if (row < 0 || column < 0) {
      throw new AssertionError({
        message: 'Arguments must be positive integers.'
      })
    } else if (row >= this.rows || column >= this.columns) {
      throw new AssertionError({
        message: 'Arguments must correspond to a position within the matrix.'
      })
    }

    return new Matrix(
      this.matrix.filter((vector, index) => index !== row).map(
        (vector) => new Vector(
          vector.vector.filter((numeral, index) => index !== column)
        )
      )
    )
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
    if (!Number.isInteger(rows) || !Number.isInteger(columns)) {
      throw new TypeError('Dimensions must be integers.')
    } else if (rows <= 0 || columns <= 0) {
      throw new AssertionError({
        message: 'Dimensions must be positive integers.'
      })
    }

    return new Matrix(
      Array.from({ length: rows }, () => Vector.random(columns, type))
    )
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

  /**
   * Creates an identity matrix of shape `size` * `size`.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Number} size - Size of the matrix.
   * @returns {Matrix} - Identity matrix.
   * @static
   * @throws {TypeError} - Size must be an integer.
   * @throws {AssertionError} - Size must be a positive integer.
   * @see https://en.wikipedia.org/wiki/Identity_matrix
   */
  static identityMatrix(size) {
    if (!Number.isInteger(size)) {
      throw new TypeError('Size must be an integer.')
    } else if (size <= 0) {
      throw new AssertionError({
        message: 'Size must be a positive integer.'
      })
    }

    const matrix = Matrix.initialize(size, size)

    for (let i = 0; i < size; i++) {
      matrix.matrix[i].vector[i] = new Numeral(1)
    }

    return matrix
  }

  /**
   * Creates a matrix of shape `rows` * `columns` with all elements initialized to 0.
   * 
   * @description Space complexity: O(n), time complexity: O(n).
   * @param {Number} rows - Number of rows.
   * @param {Number} columns - Number of columns.
   * @returns {Matrix} - Matrix of shape `rows` * `columns` with all elements initialized to 0.
   * @static
   * @throws {TypeError} - Dimensions must be integers.
   * @throws {AssertionError} - Dimensions must be positive integers.
   */
  static initialize(rows, columns) {
    if (!Number.isInteger(rows) || !Number.isInteger(columns)) {
      throw new TypeError('Dimensions must be integers.')
    } else if (rows <= 0 || columns <= 0) {
      throw new AssertionError({
        message: 'Dimensions must be positive integers.'
      })
    }

    return new Matrix(
      Array.from({ length: rows }, () => Vector.initialize(columns))
    )
  }
}