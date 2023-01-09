import { expect } from 'chai'
import { AssertionError } from 'node:assert'

import { Numeral, Vector, Matrix } from '#classes'

export default () => {
  describe('Matrix', () => {
    it('[[1, 0], [0, 1]] * [4, 2] = [[4], [2]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const v1 = new Vector([new Numeral(4), new Numeral(2)])
      const expected = new Matrix([
        new Vector([new Numeral(4)]),
        new Vector([new Numeral(2)]),
      ])
      const result = m1.multiplyVector(v1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2, 0], [0, 2]] * [4, 2] = [[8], [4]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(2)]),
      ])
      const v1 = new Vector([new Numeral(4), new Numeral(2)])
      const expected = new Matrix([
        new Vector([new Numeral(8)]),
        new Vector([new Numeral(4)]),
      ])
      const result = m1.multiplyVector(v1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2, -2], [-2, 2]] * [4, 2] = [[4], [-4]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2), new Numeral(-2)]),
        new Vector([new Numeral(-2), new Numeral(2)]),
      ])
      const v1 = new Vector([new Numeral(4), new Numeral(2)])
      const expected = new Matrix([
        new Vector([new Numeral(4)]),
        new Vector([new Numeral(-4)]),
      ])
      const result = m1.multiplyVector(v1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2.5, 1.5], [1.75, 2.75]] * [4.2, 2.1] = [[13.65], [13.125]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2.5), new Numeral(1.5)]),
        new Vector([new Numeral(1.75), new Numeral(2.75)]),
      ])
      const v1 = new Vector([new Numeral(4.2), new Numeral(2.1)])
      const expected = new Matrix([
        new Vector([new Numeral(13.65)]),
        new Vector([new Numeral(13.125)]),
      ])
      const result = m1.multiplyVector(v1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[i, i], [i, i]] * [i, i] = [[-2]], [-2]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(0, 1), new Numeral(0, 1)]),
        new Vector([new Numeral(0, 1), new Numeral(0, 1)]),
      ])
      const v1 = new Vector([new Numeral(0, 1), new Numeral(0, 1)])
      const expected = new Matrix([
        new Vector([new Numeral(-2)]),
        new Vector([new Numeral(-2)]),
      ])
      const result = m1.multiplyVector(v1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2 + 4i, 1 - 3i], [2 + 5i, 7 - 9i]] * [4 - i, 2 + 7i] = [[35 + 15i], [90 + 49i]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2, 4), new Numeral(1, -3)]),
        new Vector([new Numeral(2, 5), new Numeral(7, -9)]),
      ])
      const v1 = new Vector([new Numeral(4, -1), new Numeral(2, 7)])
      const expected = new Matrix([
        new Vector([new Numeral(35, 15)]),
        new Vector([new Numeral(90, 49)]),
      ])
      const result = m1.multiplyVector(v1)

      expect(result.equals(expected)).to.be.true
    })

    it('[[2.5 + 1.2i, -1.7 - 2.3i], [9.4 + 2.1i, -0.5 - 1.3i]] * [-0.3 + 4.7i, 5.7 - 6.5i] = [[-31.03 + 9.33i], [-23.99 + 39.39i]]', () => {
      const m1 = new Matrix([
        new Vector([new Numeral(2.5, 1.2), new Numeral(-1.7, -2.3)]),
        new Vector([new Numeral(9.4, 2.1), new Numeral(-0.5, -1.3)]),
      ])
      const v1 = new Vector([new Numeral(-0.3, 4.7), new Numeral(5.7, -6.5)])
      const expected = new Matrix([
        new Vector([new Numeral(-31.03, 9.33)]),
        new Vector([new Numeral(-23.99, 39.39)]),
      ])
      const result = m1.multiplyVector(v1)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Matrix', () => {
      it('Argument must be an instance of Vector', () => {
        const m1 = new Matrix([
          new Vector([new Numeral(1), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(1)]),
        ])
        const v1 = new Numeral(4, 2)

        expect(() => m1.multiplyVector(v1)).to.throw(
          TypeError,
          'Argument must be an instance of Vector.'
        )
      })

      it('Vector size and matrix column count must be equal', () => {
        const m1 = new Matrix([
          new Vector([new Numeral(1), new Numeral(0)]),
          new Vector([new Numeral(0), new Numeral(1)]),
        ])
        const v1 = new Vector([new Numeral(4), new Numeral(2), new Numeral(1)])

        expect(() => m1.multiplyVector(v1)).to.throw(
          AssertionError,
          'Vector size and base matrix columns amount must match.'
        )
      })
    })
  })
}
