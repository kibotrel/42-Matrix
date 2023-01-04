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
  })

  describe('Values', () => {
    it('Empty vector', () => {
      const vector = new Vector()

      expect(vector.vector).to.be.an('array')
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

  describe('Extra methods', () => {
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
          Error,
          'Vectors must be of the same size.'
        )
      })
    })

    describe('ToMatrix', () => {
      it('Empty vector', () => {
        const vector = new Vector()
        const shape = new Vector([new Numeral(0), new Numeral(0)])
        const matrix = vector.toMatrix(shape)

        expect(matrix.rows).to.equal(0)
        expect(matrix.columns).to.equal(0)
        expect(matrix.shape.equals(shape)).to.be.true
      })

      it('Vector with one element', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = new Vector([new Numeral(1), new Numeral(1)])
        const matrix = vector.toMatrix(shape)
        const result = new Matrix([new Vector([new Numeral(1)])])

        expect(matrix.rows).to.equal(1)
        expect(matrix.columns).to.equal(1)
        expect(matrix.shape.equals(shape)).to.be.true
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
        const shape = new Vector([new Numeral(1), new Numeral(5)])
        const matrix = vector.toMatrix(shape)
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
        expect(matrix.shape.equals(shape)).to.be.true
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
        const shape = new Vector([new Numeral(5), new Numeral(1)])
        const matrix = vector.toMatrix(shape)
        const result = new Matrix([
          new Vector([new Numeral(1)]),
          new Vector([new Numeral(2)]),
          new Vector([new Numeral(3)]),
          new Vector([new Numeral(4)]),
          new Vector([new Numeral(5)]),
        ])

        expect(matrix.rows).to.equal(5)
        expect(matrix.columns).to.equal(1)
        expect(matrix.shape.equals(shape)).to.be.true
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
        const shape = new Vector([new Numeral(3), new Numeral(2)])
        const matrix = vector.toMatrix(shape)
        const result = new Matrix([
          new Vector([new Numeral(1), new Numeral(2)]),
          new Vector([new Numeral(3), new Numeral(4)]),
          new Vector([new Numeral(5), new Numeral(6)]),
        ])

        expect(matrix.rows).to.equal(3)
        expect(matrix.columns).to.equal(2)
        expect(matrix.shape.equals(shape)).to.be.true
        expect(matrix.equals(result)).to.be.true
      })

      it('Second operand must be a Vector instance', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = new Numeral(2)

        expect(() => vector.toMatrix(shape)).to.throw(
          TypeError,
          'Argument must be an instance of Vector.'
        )
      })

      it('Second operand must be a 2D vector', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = new Vector([new Numeral(1)])

        expect(() => vector.toMatrix(shape)).to.throw(
          Error,
          'Argument must be a 2D vector.'
        )
      })

      it('Second operand must be a 2D vector of integers', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = new Vector([new Numeral(1), new Numeral(1.5)])

        expect(() => vector.toMatrix(shape)).to.throw(
          Error,
          'Argument must be a 2D vector of integers.'
        )
      })

      it('Second operand must be a 2D vector of positive integers', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = new Vector([new Numeral(1), new Numeral(-1)])

        expect(() => vector.toMatrix(shape)).to.throw(
          Error,
          'Argument must be a 2D vector of positive integers.'
        )
      })

      it('Second operand must be a 2D vector of integers whose product is equal to the size of the vector', () => {
        const vector = new Vector([new Numeral(1)])
        const shape = new Vector([new Numeral(2), new Numeral(2)])

        expect(() => vector.toMatrix(shape)).to.throw(
          Error,
          'Argument must be a 2D vector of integers whose product is equal to the size of the vector.'
        )
      })
    })
  })
}
