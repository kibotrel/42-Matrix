import { AssertionError } from 'node:assert'

import { expect } from 'chai'
import util from 'util'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Constructor', () => {
    it('Name', () => {
      const matrix = new Matrix()

      expect(matrix.constructor.name).to.equal('Matrix')
    })

    it('Properties', () => {
      const matrix = new Matrix()

      expect(matrix).to.be.an('object')
      expect(matrix).to.have.property('matrix')
      expect(matrix.matrix).to.be.an('array')
      expect(matrix).to.have.property('rows')
      expect(matrix.rows).to.be.a('number')
      expect(matrix).to.have.property('columns')
      expect(matrix.columns).to.be.a('number')
      expect(matrix).to.have.property('shape')
      expect(matrix.shape).to.be.instanceOf(Array)
    })

    it('Default values', () => {
      const matrix = new Matrix()

      expect(matrix.matrix).to.be.empty
      expect(matrix.rows).to.equal(0)
      expect(matrix.columns).to.equal(0)
      expect(JSON.stringify(matrix.shape) === JSON.stringify([0, 0])).to.be.true
    })
  })

  describe('Instance methods', () => {
    it('Print', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property(util.inspect.custom)
      expect(matrix[util.inspect.custom]()).to.be.a('string')
    })

    it('Add', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('add')
      expect(matrix.add).to.be.a('function')
    })

    it('Subtract', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('subtract')
      expect(matrix.subtract).to.be.a('function')
    })

    it('Scale', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('scale')
      expect(matrix.scale).to.be.a('function')
    })

    it('Equals', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('equals')
      expect(matrix.equals).to.be.a('function')
    })

    it('IsSquare', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('isSquare')
      expect(matrix.isSquare).to.be.a('function')
    })

    it('ToVector', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('toVector')
      expect(matrix.toVector).to.be.a('function')
    })

    it('MultiplyVector', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('multiplyVector')
      expect(matrix.multiplyVector).to.be.a('function')
    })

    it('MultiplyMatrix', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('multiplyMatrix')
      expect(matrix.multiplyMatrix).to.be.a('function')
    })

    it('Trace', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('trace')
      expect(matrix.trace).to.be.a('function')
    })

    it('Transpose', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('transpose')
      expect(matrix.transpose).to.be.a('function')
    })

    it('Clone', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('clone')
      expect(matrix.clone).to.be.a('function')
    })

    it('SubMatrix', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('subMatrix')
      expect(matrix.subMatrix).to.be.a('function')
    })

    it('Determinant', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('determinant')
      expect(matrix.determinant).to.be.a('function')
    })

    it('triangulation', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('triangulation')
      expect(matrix.triangulation).to.be.a('function')
    })

    it('DiagonalProduct', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('diagonalProduct')
      expect(matrix.diagonalProduct).to.be.a('function')
    })

    it('Inverse', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('inverse')
      expect(matrix.inverse).to.be.a('function')
    })

    it('Augment', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('augment')
      expect(matrix.augment).to.be.a('function')
    })
  })

  describe('Static methods', () => {
    it('Random', () => {
      expect(Matrix).to.have.property('random')
      expect(Matrix.random).to.be.a('function')
    })

    it('linearCombination', () => {
      expect(Matrix).to.have.property('linearCombination')
      expect(Matrix.linearCombination).to.be.a('function')
    })

    it('linearInterpolation', () => {
      expect(Matrix).to.have.property('linearInterpolation')
      expect(Matrix.linearCombination).to.be.a('function')
    })

    it('IdentityMatrix', () => {
      expect(Matrix).to.have.property('identityMatrix')
      expect(Matrix.identityMatrix).to.be.a('function')
    })

    it('Initialize', () => {
      expect(Matrix).to.have.property('initialize')
      expect(Matrix.initialize).to.be.a('function')
    })
  })


  describe('Values', () => {
    it('Empty matrix', () => {
      const matrix = new Matrix()

      expect(matrix.matrix).to.be.an('array').that.is.empty
      expect(matrix.rows).to.equal(0)
      expect(matrix.columns).to.equal(0)

    })

    it('Matrix with one row', () => {
      const matrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])

      expect(matrix.matrix).to.be.an('array').that.is.not.empty
      expect(matrix.rows).to.equal(1)
      expect(matrix.columns).to.equal(2)
      expect(matrix.shape).to.be.an('array').that.is.not.empty
      expect(matrix.shape).to.have.lengthOf(2)
      expect(matrix.shape[0]).to.equal(1)
      expect(matrix.shape[1]).to.equal(2)
    })

    it('Matrix with multiple rows', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(2)]),
        new Vector([new Numeral(3), new Numeral(4)]),
        new Vector([new Numeral(5), new Numeral(6)])
      ])

      expect(matrix.matrix).to.be.an('array').that.is.not.empty
      expect(matrix.rows).to.equal(3)
      expect(matrix.columns).to.equal(2)
      expect(matrix.shape).to.be.an('array').that.is.not.empty
      expect(matrix.shape).to.have.lengthOf(2)
      expect(matrix.shape[0]).to.equal(3)
      expect(matrix.shape[1]).to.equal(2)
    })
  })

  describe('Extra instance methods', () => {
    describe('Equals', () => {
      it('Empty matrices', () => {
        const matrix = new Matrix()
        const otherMatrix = new Matrix()

        expect(matrix.equals(otherMatrix)).to.be.true
      })

      it('Equal with one row', () => {
        const matrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])
        const otherMatrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])

        expect(matrix.equals(otherMatrix)).to.be.true
      })

      it('Not equal with one row', () => {
        const matrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])
        const otherMatrix = new Matrix([new Vector([new Numeral(1), new Numeral(3)])])

        expect(matrix.equals(otherMatrix)).to.be.false
      })

      it('Not equal with multiple rows', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)]),
          new Vector([new Numeral(5), new Numeral(6)])
        ])
        const otherMatrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(9), new Numeral(4)]),
          new Vector([new Numeral(5), new Numeral(7)])
        ])

        expect(matrix.equals(otherMatrix)).to.be.false
      })

      it('Second operand must be a Matrix instance', () => {
        const matrix = new Matrix()

        expect(() => matrix.equals({})).to.throw(TypeError, 'Argument must be an instance of Matrix.')
      })

      it('Second operand must be of the same shape', () => {
        const matrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])
        const otherMatrix = new Matrix([new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])])

        expect(() => matrix.equals(otherMatrix)).to.throw(AssertionError, 'Matrices must be of the same shape.')
      })
    })

    describe('IsSquare', () => {
      it('Square matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)])
        ])

        expect(matrix.isSquare()).to.be.true
      })

      it('Non-square matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(4), new Numeral(5), new Numeral(6)])
        ])

        expect(matrix.isSquare()).to.be.false
      })
    })

    describe('ToVector', () => {
      it('Empty matrix', () => {
        const matrix = new Matrix()
        const vector = matrix.toVector()

        expect(vector).to.be.instanceOf(Vector)
        expect(vector.vector).to.be.an('array').that.is.empty
        expect(vector.size).to.equal(0)
      })

      it('Matrix with one row', () => {
        const matrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])
        const vector = matrix.toVector()

        expect(vector).to.be.instanceOf(Vector)
        expect(vector.vector).to.be.an('array').that.is.not.empty
        expect(vector.vector).to.have.lengthOf(2)
        expect(vector.vector[0].equals(new Numeral(1))).to.be.true
        expect(vector.vector[1].equals(new Numeral(2))).to.be.true
        expect(vector.size).to.equal(2)
      })

      it('Matrix with multiple rows', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)]),
          new Vector([new Numeral(5), new Numeral(6)])
        ])
        const vector = matrix.toVector()

        expect(vector).to.be.instanceOf(Vector)
        expect(vector.vector).to.be.an('array').that.is.not.empty
        expect(vector.vector).to.have.lengthOf(6)
        expect(vector.vector[0].equals(new Numeral(1))).to.be.true
        expect(vector.vector[1].equals(new Numeral(2))).to.be.true
        expect(vector.vector[2].equals(new Numeral(3))).to.be.true
        expect(vector.vector[3].equals(new Numeral(4))).to.be.true
        expect(vector.vector[4].equals(new Numeral(5))).to.be.true
        expect(vector.vector[5].equals(new Numeral(6))).to.be.true
        expect(vector.size).to.equal(6)
      })
    })

    describe('Clone', () => {
      it('Clone equals original', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)]),
          new Vector([new Numeral(5), new Numeral(6)])
        ])
        const clone = matrix.clone()

        expect(clone).to.be.instanceOf(Matrix)
        expect(clone.equals(matrix)).to.be.true
      })
    })

    describe('Submatrix', () => {
      it('3D to 2D matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(4), new Numeral(5), new Numeral(6)]),
          new Vector([new Numeral(7), new Numeral(8), new Numeral(9)])
        ])
        const submatrix = matrix.subMatrix(0, 0)
        const expectedMatrix = new Matrix([
          new Vector([new Numeral(5), new Numeral(6)]),
          new Vector([new Numeral(8), new Numeral(9)])
        ])

        expect(submatrix.equals(expectedMatrix)).to.be.true
      })

      it('1D to 0D matrix', () => {
        const matrix = new Matrix([new Vector([new Numeral(1)])])
        const submatrix = matrix.subMatrix(0, 0)

        expect(submatrix.equals(new Matrix())).to.be.true
      })

      it('Arguments must be integers', () => {
        const matrix = new Matrix([new Vector([new Numeral(1)])])

        expect(() => matrix.subMatrix(0.5, 0)).to.throw(
          TypeError,
          'Arguments must be integers.'
        )
        expect(() => matrix.subMatrix(0, 0.5)).to.throw(
          TypeError,
          'Arguments must be integers.'
        )
      })

      it('Arguments must be positive integers', () => {
        const matrix = new Matrix([new Vector([new Numeral(1)])])

        expect(() => matrix.subMatrix(-1, 0)).to.throw(
          AssertionError,
          'Arguments must be positive integers.'
        )
        expect(() => matrix.subMatrix(0, -1)).to.throw(
          AssertionError,
          'Arguments must be positive integers.'
        )
      })

      it('Arguments must correspond to a position within the matrix', () => {
        const matrix = new Matrix([new Vector([new Numeral(1)])])

        expect(() => matrix.subMatrix(1, 0)).to.throw(
          AssertionError,
          'Arguments must correspond to a position within the matrix.'
        )
        expect(() => matrix.subMatrix(0, 1)).to.throw(
          AssertionError,
          'Arguments must correspond to a position within the matrix.'
        )
      })
    })

    describe('Triangulation', () => {
      it('Matrix must be square', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
        ])

        expect(() => matrix.triangulation()).to.throw(
          AssertionError,
          'Matrix must be square.'
        )
      })
    })

    describe('DiagonalProduct', () => {
      it('Matrix must be square', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
        ])

        expect(() => matrix.diagonalProduct()).to.throw(
          AssertionError,
          'Matrix must be square.'
        )
      })

      it('Diagonal product of a 2D matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)])
        ])
        const product = matrix.diagonalProduct()

        expect(product.equals(new Numeral(4))).to.be.true
      })
    })

    describe('Augment', () => {
      it('Argument must be an instance of Matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
        ])

        expect(() => matrix.augment()).to.throw(
          TypeError,
          'Argument must be an instance of Matrix.'
        )
      })

      it('Argument must have the same number of rows as the matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
        ])
        const otherMatrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)])
        ])

        expect(() => matrix.augment(otherMatrix)).to.throw(
          AssertionError,
          'Matrices must have the same number of rows.'
        )
      })

      it('Augment a 2D matrix', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)])
        ])
        const otherMatrix = new Matrix([
          new Vector([new Numeral(5), new Numeral(6)]),
          new Vector([new Numeral(7), new Numeral(8)])
        ])
        const augmentedMatrix = matrix.augment(otherMatrix)
        const expectedMatrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2), new Numeral(5), new Numeral(6)]),
          new Vector([new Numeral(3), new Numeral(4), new Numeral(7), new Numeral(8)])
        ])

        expect(augmentedMatrix.equals(expectedMatrix)).to.be.true
      })
    })
  })

  describe('Extra static methods', () => {
    describe('Random', () => {
      it('Default behaviour', () => {
        expect(() => Matrix.random()).to.throw(TypeError, 'Dimensions must be integers.')
      })

      it('Matrix with one row', () => {
        const matrix = Matrix.random(1, 2)

        expect(matrix).to.be.instanceOf(Matrix)
        expect(matrix.matrix).to.be.an('array').that.is.not.empty
        expect(matrix.matrix).to.have.lengthOf(1)
        expect(matrix.matrix[0]).to.be.instanceOf(Vector)
        expect(matrix.matrix[0].vector).to.be.an('array').that.is.not.empty
        expect(matrix.matrix[0].vector).to.have.lengthOf(2)
        expect(matrix.matrix[0].vector[0]).to.be.instanceOf(Numeral)
        expect(matrix.matrix[0].vector[1]).to.be.instanceOf(Numeral)
        expect(matrix.rows).to.equal(1)
        expect(matrix.columns).to.equal(2)
        expect(matrix.shape).to.be.an('array').that.is.not.empty
        expect(matrix.shape).to.have.lengthOf(2)
        expect(matrix.shape[0]).to.equal(1)
        expect(matrix.shape[1]).to.equal(2)
      })

      it('Matrix with multiple rows', () => {
        const matrix = Matrix.random(3, 2)

        expect(matrix).to.be.instanceOf(Matrix)
        expect(matrix.matrix).to.be.an('array').that.is.not.empty
        expect(matrix.matrix).to.have.lengthOf(3)
        expect(matrix.matrix[0]).to.be.instanceOf(Vector)
        expect(matrix.matrix[0].vector).to.be.an('array').that.is.not.empty
        expect(matrix.matrix[0].vector).to.have.lengthOf(2)
        expect(matrix.matrix[0].vector[0]).to.be.instanceOf(Numeral)
        expect(matrix.matrix[0].vector[1]).to.be.instanceOf(Numeral)
        expect(matrix.matrix[1]).to.be.instanceOf(Vector)
        expect(matrix.matrix[1].vector).to.be.an('array').that.is.not.empty
        expect(matrix.matrix[1].vector).to.have.lengthOf(2)
        expect(matrix.matrix[1].vector[0]).to.be.instanceOf(Numeral)
        expect(matrix.matrix[1].vector[1]).to.be.instanceOf(Numeral)
        expect(matrix.matrix[2]).to.be.instanceOf(Vector)
        expect(matrix.matrix[2].vector).to.be.an('array').that.is.not.empty
        expect(matrix.matrix[2].vector).to.have.lengthOf(2)
        expect(matrix.matrix[2].vector[0]).to.be.instanceOf(Numeral)
        expect(matrix.matrix[2].vector[1]).to.be.instanceOf(Numeral)
        expect(matrix.rows).to.equal(3)
        expect(matrix.columns).to.equal(2)
        expect(matrix.shape).to.be.an('array').that.is.not.empty
        expect(matrix.shape).to.have.lengthOf(2)
        expect(matrix.shape[0]).to.equal(3)
        expect(matrix.shape[1]).to.equal(2)
      })

      it('Matrix dimensions must be integers', () => {
        expect(() => Matrix.random(1.5, 2)).to.throw(TypeError, 'Dimensions must be integers.')
      })

      it('Matrix dimensions must be positive integers', () => {
        expect(() => Matrix.random(-1, 2)).to.throw(AssertionError, 'Dimensions must be positive integers.')
      })
    })

    describe('IdentityMatrix', () => {
      it('Argument must be an integer', () => {
        expect(() => Matrix.identityMatrix(1.5)).to.throw(
          TypeError,
          'Argument must be an integer.'
        )
      })

      it('Argument must be a positive integer', () => {
        expect(() => Matrix.identityMatrix(-1)).to.throw(
          AssertionError,
          'Argument must be a positive integer.'
        )
      })

      it('3D identity matrix', () => {
        const matrix = Matrix.identityMatrix(3)
        const expectedMatrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(0), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(0), new Numeral(1)])
        ])

        expect(matrix.equals(expectedMatrix)).to.be.true
      })
    })

    describe('Initialize', () => {
      it('Arguments must be integers', () => {
        expect(() => Matrix.initialize(1.5, 2, new Numeral(1))).to.throw(
          TypeError,
          'Arguments must be integers.'
        )
      })

      it('Arguments must be positive integers', () => {
        expect(() => Matrix.initialize(-1, 2, new Numeral(1))).to.throw(
          AssertionError,
          'Arguments must be positive integers.'
        )
      })

      it('Initialize a 2 * 3 matrix with all elements equal to 1', () => {
        const matrix = Matrix.initialize(2, 3, new Numeral(1))
        const expectedMatrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(1), new Numeral(1)]),
          new Vector([new Numeral(1), new Numeral(1), new Numeral(1)])
        ])

        expect(matrix.equals(expectedMatrix)).to.be.true
      })
    })
  })
}
