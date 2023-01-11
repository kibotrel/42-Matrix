import { expect } from 'chai'
import { AssertionError } from 'node:assert'
import { Matrix, Vector, Numeral } from '#classes'

export default () => {
  describe('Matrix', () => {
    it('[[1]] = 1', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1)])
      ])
      const result = matrix.determinant()
      const expected = new Numeral(1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[1, -1], [-1, 1]] = 0', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(-1)]),
        new Vector([new Numeral(-1), new Numeral(1)])
      ])
      const result = matrix.determinant()
      const expected = new Numeral(0)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2, 0, 0], [0, 2, 0], [0, 0, 2]] = 8', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(2), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(2), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(2)])
      ])
      const result = matrix.determinant()
      const expected = new Numeral(8)

      expect(result.equals(expected)).to.be.true
    })

    it('[[8, 5, -2], [4, 7, 20], [7, 6, 1]] = -174', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(8), new Numeral(5), new Numeral(-2)]),
        new Vector([new Numeral(4), new Numeral(7), new Numeral(20)]),
        new Vector([new Numeral(7), new Numeral(6), new Numeral(1)])
      ])
      const result = matrix.determinant()
      const expected = new Numeral(-174)

      expect(result.equals(expected)).to.be.true
    })

    it('[[8, 5, -2, 4], [4, 2.5, 20, 4], [8, 5, 1, 4], [28, -4, 17, 1]] = 1032', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(8), new Numeral(5), new Numeral(-2), new Numeral(4)]),
        new Vector([new Numeral(4), new Numeral(2.5), new Numeral(20), new Numeral(4)]),
        new Vector([new Numeral(8), new Numeral(5), new Numeral(1), new Numeral(4)]),
        new Vector([new Numeral(28), new Numeral(-4), new Numeral(17), new Numeral(1)])
      ])
      const result = matrix.determinant()
      const expected = new Numeral(1032)

      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Matrix', () => {
      it('Matrix must be square', () => {
        expect(() => {
          const matrix = new Matrix([
            new Vector([new Numeral(1), new Numeral(2)]),
            new Vector([new Numeral(3), new Numeral(4)]),
            new Vector([new Numeral(5), new Numeral(6)])
          ])
          matrix.determinant()
        }).to.throw(
          AssertionError,
          'Matrix must be square.')
      })
    })
  })
}
