import { expect } from 'chai'
import { AssertionError } from 'node:assert'
import util from 'node:util'
import { Numeral, Vector, Matrix } from '#classes'

export default () => {
  describe('Matrix', () => {
    it('[[1, 0], [0, 1]] * [[1, 0], [0, 1]] = [[1, 0], [0, 1]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const m2 = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const result = m1.multiplyMatrix(m2)

      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 0], [0, 1]] * [[2, 1], [4, 2]] = [[2, 1], [4, 2]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const m2 = new Matrix([
        new Vector([new Numeral(2), new Numeral(1)]),
        new Vector([new Numeral(4), new Numeral(2)]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(2), new Numeral(1)]),
        new Vector([new Numeral(4), new Numeral(2)]),
      ])
      const result = m1.multiplyMatrix(m2)

      expect(result.equals(expected)).to.be.true
    })

    it('[[3, -5], [6, 8]] * [[2, 1], [4, 2]] = [[-14, -7], [44, 22]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(3), new Numeral(-5)]),
        new Vector([new Numeral(6), new Numeral(8)]),
      ])
      const m2 = new Matrix([
        new Vector([new Numeral(2), new Numeral(1)]),
        new Vector([new Numeral(4), new Numeral(2)]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(-14), new Numeral(-7)]),
        new Vector([new Numeral(44), new Numeral(22)]),
      ])
      const result = m1.multiplyMatrix(m2)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2.5, 6.4, 3.9], [1.7, 0.3, 6.5], [2.4, 1.1, 0.5]] * [[3.4, 6.9, 4.2], [0.6, 0.4, 1.7], [9.8, 5.5, 4.3]] = [[50.56, 41.26, 38.15], [69.66, 47.6, 35.6], [13.72, 19.75, 14.1]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2.5), new Numeral(6.4), new Numeral(3.9)]),
        new Vector([new Numeral(1.7), new Numeral(0.3), new Numeral(6.5)]),
        new Vector([new Numeral(2.4), new Numeral(1.1), new Numeral(0.5)]),
      ])
      const m2 = new Matrix([
        new Vector([new Numeral(3.4), new Numeral(6.9), new Numeral(4.2)]),
        new Vector([new Numeral(0.6), new Numeral(0.4), new Numeral(1.7)]),
        new Vector([new Numeral(9.8), new Numeral(5.5), new Numeral(4.3)]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(50.56), new Numeral(41.26), new Numeral(38.15)]),
        new Vector([new Numeral(69.66), new Numeral(47.6), new Numeral(35.6)]),
        new Vector([new Numeral(13.72), new Numeral(19.75), new Numeral(14.1)]),
      ])
      const result = m1.multiplyMatrix(m2)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2 + 8i, -6 - 2i], [1 - 7i, 3i]] * [[3 + 4i, 6 + 9i], [-9 - 8i, 5 + 5i]] = [[12 + 98i, -80 + 26i], [55 - 44i, 54 - 18i]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2, 8), new Numeral(-6, -2),]),
        new Vector([new Numeral(1, -7), new Numeral(0, 3),]),
      ])
      const m2 = new Matrix([
        new Vector([new Numeral(3, 4), new Numeral(6, 9),]),
        new Vector([new Numeral(-9, -8), new Numeral(5, 5),]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(12, 98), new Numeral(-80, 26),]),
        new Vector([new Numeral(55, -44), new Numeral(54, -18),]),
      ])
      const result = m1.multiplyMatrix(m2)

      expect(result.equals(expected)).to.be.true
    })

    it('[[0.1 + 4.2i, -5.1i], [4.9 - 4.9i, 3.8 + 9.4i]] * [[8.9 - 2.5i, 5.6 - 2.2i], [2.9i, 8.5]] = [[26.18 + 37.13i, 9.8 - 20.05i], [4.1 - 44.84i, 48.96 + 41.68i]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(0.1, 4.2), new Numeral(0, -5.1),]),
        new Vector([new Numeral(4.9, -4.9), new Numeral(3.8, 9.4),]),
      ])
      const m2 = new Matrix([
        new Vector([new Numeral(8.9, -2.5), new Numeral(5.6, -2.2),]),
        new Vector([new Numeral(0, 2.9), new Numeral(8.5, 0),]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(26.18, 37.13), new Numeral(9.8, -20.05),]),
        new Vector([new Numeral(4.1, -44.84), new Numeral(48.96, 41.68),]),
      ])
      const result = m1.multiplyMatrix(m2)

      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Matrix', () => {
      it('Argument must be an instance of Matrix', () => {
        const m1 = new Matrix([
          new Vector([new Numeral(1), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(1)]),
        ])
        const m2 = new Numeral(4, 2)

        expect(() => m1.multiplyMatrix(m2)).to.throw(
          TypeError,
          'Argument must be an instance of Matrix.'
        )
      })

      it('First matrix column count must match second\'s row count', () => {
        const m1 = new Matrix([
          new Vector([new Numeral(1), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(1)]),
        ])
        const m2 = new Matrix([
          new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
        ])

        expect(() => m1.multiplyMatrix(m2)).to.throw(
          AssertionError,
          'Argument\'s rows amount and base matrix columns amount must match.'
        )
      })
    })
  })
}
