import { expect } from 'chai'
import { AssertionError } from 'node:assert'
import { Numeral, Vector, Matrix } from '#classes'

export default () => {
  describe('Matrix', () => {
    it('[[1, 0], [0, 1]] = 2', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const expected = new Numeral(2)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })

    it('[[2, -5, 0], [4, 3, 7], [-2, 3, 4]] = 9', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(2), new Numeral(-5), new Numeral(0)]),
        new Vector([new Numeral(4), new Numeral(3), new Numeral(7)]),
        new Vector([new Numeral(-2), new Numeral(3), new Numeral(4)]),
      ])
      const expected = new Numeral(9)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })

    it('[[-2, -8, 4], [1, -23, 4], [0, 6, 4]] = -21', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(-2), new Numeral(-8), new Numeral(4)]),
        new Vector([new Numeral(1), new Numeral(-23), new Numeral(4)]),
        new Vector([new Numeral(0), new Numeral(6), new Numeral(4)]),
      ])
      const expected = new Numeral(-21)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })

    it('[[1.9, 9.5, -1.4], [-0.5, 2.4, 7.1], [9.7, 6.6, -0.1]] = 4.2', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1.9), new Numeral(9.5), new Numeral(-1.4)]),
        new Vector([new Numeral(-0.5), new Numeral(2.4), new Numeral(7.1)]),
        new Vector([new Numeral(9.7), new Numeral(6.6), new Numeral(-0.1)]),
      ])
      const expected = new Numeral(4.2)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })

    it('[[3i, 4 + 2i, -9 - 5i], [2 - 5i, 4 + 9i, 2], [3 - 8i, 7 + i, 4 - 7i]] = 8 + 5i', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(0, 3), new Numeral(4, 2), new Numeral(-9, -5)]),
        new Vector([new Numeral(2, -5), new Numeral(4, 9), new Numeral(2)]),
        new Vector([new Numeral(3, -8), new Numeral(7, 1), new Numeral(4, -7)]),
      ])
      const expected = new Numeral(8, 5)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })

    it('[[1 + 9.2i, -4.2 + 2.1i, -0.4 + 6.8i], [-2.4 - 3.9i, 3.1 + 4.4i, 7.3 + 4.9i], [-0.9 - 8.1i, 1.7 + 6.3i, 9.3 - 2.8i]] = 13.4 + 10.8i', () => {
      const matrix = new Matrix([
        new Vector([
          new Numeral(1, 9.2),
          new Numeral(-4.2, 2.1),
          new Numeral(-0.4, 6.8),
        ]),
        new Vector([
          new Numeral(-2.4, -3.9),
          new Numeral(3.1, 4.4),
          new Numeral(7.3, 4.9),
        ]),
        new Vector([
          new Numeral(-0.9, -8.1),
          new Numeral(1.7, 6.3),
          new Numeral(9.3, -2.8),
        ]),
      ])
      const expected = new Numeral(13.4, 10.8)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Matrix', () => {
      it('Matrix must be a square', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(1)]),
          new Vector([new Numeral(0), new Numeral(1)]),
        ])

        expect(() => matrix.trace()).to.throw(
          AssertionError,
          'Matrix must be square.',
        )
      })
    })
  })
}
