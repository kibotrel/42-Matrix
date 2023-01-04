import { AssertionError } from 'node:assert'

import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Matrix', () => {
    it('[[1, 0, 0], [0, 1, 0], [0, 0, 1]] with [10, -2, 0.5] = [10, -2, 0.5]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(1)])
      ])
      const vector = new Vector([new Numeral(10), new Numeral(-2), new Numeral(0.5)])
      const result = Matrix.linearCombination(matrix, vector)
      const expected = new Vector([new Numeral(10), new Numeral(-2), new Numeral(0.5)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 2, 3], [0, 10, -100] with [10, -2] = [10, 0, 230]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(2), new Numeral(3)]),
        new Vector([new Numeral(0), new Numeral(10), new Numeral(-100)])
      ])
      const vector = new Vector([new Numeral(10), new Numeral(-2)])
      const result = Matrix.linearCombination(matrix, vector)
      const expected = new Vector([new Numeral(10), new Numeral(0), new Numeral(230)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[[1.5, 2, 3.5], [4, 5.5, 6]] with [0.1, 2] = [8.15, 11.2, 12.35]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1.5), new Numeral(2), new Numeral(3.5)]),
        new Vector([new Numeral(4), new Numeral(5.5), new Numeral(6)])
      ])
      const vector = new Vector([new Numeral(0.1), new Numeral(2)])
      const result = Matrix.linearCombination(matrix, vector)
      const expected = new Vector([new Numeral(8.15), new Numeral(11.2), new Numeral(12.35)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[[ 4 + 2i, 9 - 8i ], [ 7 - 3i, 1 + 5i ]] with [1 + 4i, -4 + 6i] = [-14 + 72i, 7 + 14i]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(4, 2), new Numeral(9, -8)]),
        new Vector([new Numeral(7, -3), new Numeral(1, 5)])
      ])
      const vector = new Vector([new Numeral(1, 4), new Numeral(-4, 6)])
      const result = Matrix.linearCombination(matrix, vector)
      const expected = new Vector([new Numeral(-14, 72), new Numeral(7, 14)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Matrix', () => {
      it('First argument must be an instance of Matrix', () => {
        expect(() => Matrix.linearCombination(null, new Vector([new Numeral(1)]))).to.throw(
          TypeError,
          'First argument must be an instance of Matrix, second argument must be an instance of Vector.')
      })

      it('Second argument must be an instance of Vector', () => {
        expect(() => Matrix.linearCombination(new Matrix(), null)).to.throw(
          TypeError,
          'First argument must be an instance of Matrix, second argument must be an instance of Vector.')
      })

      it('Matrix rows and vector size must be equal', () => {
        expect(() => Matrix.linearCombination(new Matrix([new Vector([new Numeral(1)])]), new Vector([new Numeral(1), new Numeral(2)]))).to.throw(
          AssertionError,
          'Matrix rows and vector size must be equal.')
      })
    })
  })
}
