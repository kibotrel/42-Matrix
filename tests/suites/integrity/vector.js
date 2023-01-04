import { AssertionError } from 'node:assert'

import { expect } from 'chai'
import util from 'util'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Constructor', () => {
    it('Name', () => {
      const vector = new Vector()

      expect(vector.constructor.name).to.equal('Vector')
    })

    it('Properties', () => {
      const vector = new Vector()

      expect(vector).to.be.an('object')
      expect(vector).to.have.property('vector')
      expect(vector.vector).to.be.an('array')
      expect(vector).to.have.property('size')
      expect(vector.size).to.be.a('number')
    })

    it('Default values', () => {
      const vector = new Vector()

      expect(vector.vector).to.be.empty
      expect(vector.size).to.equal(0)
    })
  })

  describe('Instance methods', () => {
    it('Print', () => {
      const vector = new Vector()

      expect(vector).to.have.property(util.inspect.custom)
      expect(vector[util.inspect.custom]()).to.be.a('string')
    })

    it('Add', () => {
      const vector = new Vector()

      expect(vector).to.have.property('add')
      expect(vector.add).to.be.a('function')
    })

    it('Subtract', () => {
      const vector = new Vector()

      expect(vector).to.have.property('subtract')
      expect(vector.subtract).to.be.a('function')
    })

    it('Scale', () => {
      const vector = new Vector()

      expect(vector).to.have.property('scale')
      expect(vector.scale).to.be.a('function')
    })

    it('Equals', () => {
      const vector = new Vector()

      expect(vector).to.have.property('equals')
      expect(vector.equals).to.be.a('function')
    })

    it('ToMatrix', () => {
      const vector = new Vector()

      expect(vector).to.have.property('toMatrix')
      expect(vector.toMatrix).to.be.a('function')
    })
  })

  describe('Static methods', () => {
    it('Random', () => {
      expect(Vector).to.have.property('random')
      expect(Vector.random).to.be.a('function')
    })

    it('Initialize', () => {
      expect(Vector).to.have.property('initialize')
      expect(Vector.initialize).to.be.a('function')
    })

    it('Lerp', () => {
      expect(Vector).to.have.property('lerp')
      expect(Vector.lerp).to.be.a('function')
    })
  })

  describe('Values', () => {
    it('Empty vector', () => {
      const vector = new Vector()

      expect(vector.vector).to.be.an('array').that.is.empty
      expect(vector.vector).to.be.empty
      expect(vector.size).to.equal(0)
    })

    it('Vector with one element', () => {
      const vector = new Vector([new Numeral(1)])

      expect(vector.vector).to.be.an('array')
      expect(vector.vector).to.have.lengthOf(1)
      expect(vector.vector[0]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[0].r).to.equal(1)
      expect(vector.vector[0].i).to.equal(0)
      expect(vector.size).to.equal(1)
    })

    it('Vector with many elements', () => {
      const vector = new Vector([
        new Numeral(1),
        new Numeral(2),
        new Numeral(3),
        new Numeral(4),
        new Numeral(5),
      ])

      expect(vector.vector).to.be.an('array')
      expect(vector.vector).to.have.lengthOf(5)
      expect(vector.vector[0]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[0].r).to.equal(1)
      expect(vector.vector[0].i).to.equal(0)
      expect(vector.vector[1]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[1].r).to.equal(2)
      expect(vector.vector[1].i).to.equal(0)
      expect(vector.vector[2]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[2].r).to.equal(3)
      expect(vector.vector[2].i).to.equal(0)
      expect(vector.vector[3]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[3].r).to.equal(4)
      expect(vector.vector[3].i).to.equal(0)
      expect(vector.vector[4]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[4].r).to.equal(5)
      expect(vector.vector[4].i).to.equal(0)
      expect(vector.size).to.equal(5)
    })
  })

  describe('Extra instance methods', () => {
    describe('Equals', () => {
      it('Empty vectors', () => {
        const vector1 = new Vector()
        const vector2 = new Vector()

        expect(vector1.equals(vector2)).to.be.true
      })

      it('Equal with one element', () => {
        const vector1 = new Vector([new Numeral(1)])
        const vector2 = new Vector([new Numeral(1)])

        expect(vector1.equals(vector2)).to.be.true
      })

      it('Equal with many elements', () => {
        const vector1 = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
        ])
        const vector2 = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
        ])

        expect(vector1.equals(vector2)).to.be.true
      })

      it('Not equal with one element', () => {
        const vector1 = new Vector([new Numeral(1)])
        const vector2 = new Vector([new Numeral(2)])

        expect(vector1.equals(vector2)).to.be.false
      })

      it('Not equal with many elements', () => {
        const vector1 = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
        ])
        const vector2 = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(4),
          new Numeral(4),
          new Numeral(6),
        ])

        expect(vector1.equals(vector2)).to.be.false
      })

      it('Second operand must be a Vector instance', () => {
        const vector1 = new Vector([new Numeral(1)])
        const vector2 = new Numeral(2)

        expect(() => vector1.equals(vector2)).to.throw(
          TypeError,
          'Argument must be an instance of Vector.'
        )
      })

      it('Vectors must be of the same size', () => {
        const vector1 = new Vector([new Numeral(1)])
        const vector2 = new Vector([new Numeral(1), new Numeral(2)])

        expect(() => vector1.equals(vector2)).to.throw(
          AssertionError,
          'Vectors must be of the same size.'
        )
      })
    })

    describe('ToMatrix', () => {
      it('Empty vector', () => {
        const vector = new Vector()
        const shape = [0, 0]
        const matrix = vector.toMatrix(shape)

        expect(matrix.rows).to.equal(0)
        expect(matrix.columns).to.equal(0)
        expect(JSON.stringify(matrix.shape) === JSON.stringify(shape)).to.be.true
      })

      it('Vector with one element', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = [1, 1]
        const matrix = vector.toMatrix(1, 1)
        const result = new Matrix([new Vector([new Numeral(1)])])

        expect(matrix.rows).to.equal(1)
        expect(matrix.columns).to.equal(1)
        expect(JSON.stringify(matrix.shape) === JSON.stringify(shape)).to.be.true
        expect(matrix.equals(result)).to.be.true
      })

      it('Vector with N elements in a 1 * N ', () => {
        const vector = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
        ])
        const shape = [1, 5]
        const matrix = vector.toMatrix(1, 5)
        const result = new Matrix([
          new Vector([
            new Numeral(1),
            new Numeral(2),
            new Numeral(3),
            new Numeral(4),
            new Numeral(5),
          ]),
        ])

        expect(matrix.rows).to.equal(1)
        expect(matrix.columns).to.equal(5)
        expect(JSON.stringify(matrix.shape) === JSON.stringify(shape)).to.be.true
        expect(matrix.equals(result)).to.be.true
      })

      it('Vector with N elements in a N * 1 ', () => {
        const vector = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
        ])
        const shape = [5, 1]
        const matrix = vector.toMatrix(5, 1)
        const result = new Matrix([
          new Vector([new Numeral(1)]),
          new Vector([new Numeral(2)]),
          new Vector([new Numeral(3)]),
          new Vector([new Numeral(4)]),
          new Vector([new Numeral(5)]),
        ])

        expect(matrix.rows).to.equal(5)
        expect(matrix.columns).to.equal(1)
        expect(JSON.stringify(matrix.shape) === JSON.stringify(shape)).to.be.true
        expect(matrix.equals(result)).to.be.true
      })

      it('Vector with X elements in a N * M where X = N * M', () => {
        const vector = new Vector([
          new Numeral(1),
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
          new Numeral(6),
        ])
        const shape = [3, 2]
        const matrix = vector.toMatrix(3, 2)
        const result = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)]),
          new Vector([new Numeral(5), new Numeral(6)]),
        ])

        expect(matrix.rows).to.equal(3)
        expect(matrix.columns).to.equal(2)
        expect(JSON.stringify(matrix.shape) === JSON.stringify(shape)).to.be.true
        expect(matrix.equals(result)).to.be.true
      })

      it('Matrix dimensions must be integers', () => {
        const vector = new Vector([new Numeral(1)])

        expect(() => vector.toMatrix(new Numeral(2), 1)).to.throw(
          TypeError,
          'Dimensions of the target matrix must be integers.'
        )
      })

      it('Matrix dimensions must be positive integers', () => {
        const vector = new Vector([new Numeral(1)])

        expect(() => vector.toMatrix(1, -2)).to.throw(
          RangeError,
          'Dimensions of the target matrix must be positive integers.'
        )
      })

      it('Matrix dimensions product is equal to the size of the vector', () => {
        const vector = new Vector([new Numeral(1)])

        expect(() => vector.toMatrix(1, 3)).to.throw(
          AssertionError,
          'The product of the target matrix dimensions must be equal to the size of the vector.'
        )
      })
    })

    describe('ProductReduce', () => {
      it('Vector with one element', () => {
        const vector = new Vector([new Numeral(2)])
        const result = vector.productReduce()

        expect(result.equals(new Numeral(2))).to.be.true
      })

      it('Vector with many elements', () => {
        const vector = new Vector([
          new Numeral(2),
          new Numeral(3),
          new Numeral(4),
          new Numeral(5),
        ])
        const result = vector.productReduce()

        expect(result.equals(new Numeral(120))).to.be.true
      })

      it('Vector must not be empty', () => {
        const vector = new Vector()

        expect(() => vector.productReduce()).to.throw(
          AssertionError,
          'Vector must not be empty.'
        )
      })
    })
  })

  describe('Extra static methods', () => {
    describe('Random', () => {
      it('No arguments', () => {
        expect(() => Vector.random()).to.throw(
          TypeError,
          'Size must be an integer.'
        )
      })

      it('Vector with one element', () => {
        const vector = Vector.random(1)

        expect(vector.vector).to.be.an('array')
        expect(vector.vector.length).to.equal(1)
        expect(vector.size).to.equal(1)
      })

      it('Vector with many elements', () => {
        const vector = Vector.random(5)

        expect(vector.vector).to.be.an('array')
        expect(vector.vector.length).to.equal(5)
        expect(vector.size).to.equal(5)
      })

      it('Vector size must be an integer', () => {
        expect(() => Vector.random(1.2)).to.throw(
          TypeError,
          'Size must be an integer.'
        )
      })

      it('Vector size must be a positive integer', () => {
        expect(() => Vector.random(-5)).to.throw(
          AssertionError,
          'Size must be a positive integer.'
        )
      })
    })

    describe('Initialize', () => {
      it('No arguments', () => {
        expect(() => Vector.initialize()).to.throw(
          TypeError,
          'Size must be an integer.'
        )
      })

      it('Default behaviour', () => {
        const vector = Vector.initialize(5)

        expect(vector.vector).to.be.an('array')
        expect(vector.vector.length).to.equal(5)
        expect(vector.size).to.equal(5)
        expect(vector.vector.every((element) => element.equals(new Numeral(0)))).to.be.true
      })

      it('Vector with one element', () => {
        const vector = Vector.initialize(1, new Numeral(2))

        expect(vector.vector).to.be.an('array')
        expect(vector.vector.length).to.equal(1)
        expect(vector.size).to.equal(1)
        expect(vector.vector[0].equals(new Numeral(2))).to.be.true
      })

      it('Vector with many elements', () => {
        const vector = Vector.initialize(5, new Numeral(2))

        expect(vector.vector).to.be.an('array')
        expect(vector.vector.length).to.equal(5)
        expect(vector.size).to.equal(5)
        expect(vector.vector.every((element) => element.equals(new Numeral(2)))).to.be.true
      })

      it('Vector size must be an integer', () => {
        expect(() => Vector.initialize(1.2, new Numeral(2))).to.throw(
          TypeError,
          'Size must be an integer.'
        )
      })

      it('Vector size must be a positive integer', () => {
        expect(() => Vector.initialize(-5, new Numeral(2))).to.throw(
          AssertionError,
          'Size must be a positive integer.'
        )
      })
    })
  })
}
