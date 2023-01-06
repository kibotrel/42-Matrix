import { expect } from 'chai'
import { AssertionError } from 'node:assert'

import { Numeral, Vector } from '#classes'
import { countDecimals } from '#utils'

export default () => {
  describe('Vector', () => {
    it('[1, 0] and [1, 0] = 1', () => {
      const v1 = new Vector([new Numeral(1), new Numeral(0)])
      const v2 = new Vector([new Numeral(1), new Numeral(0)])
      const result = Vector.cosine(v1, v2)
      const expected = new Numeral(1)

      expect(result.equals(expected)).to.be.true
    })

    it('[1, 0] and [0, 1] = 0', () => {
      const v1 = new Vector([new Numeral(1), new Numeral(0)])
      const v2 = new Vector([new Numeral(0), new Numeral(1)])
      const result = Vector.cosine(v1, v2)
      const expected = new Numeral(0)

      expect(result.equals(expected)).to.be.true
    })

    it('[-1, 1] and [1, -1] = -1', () => {
      const v1 = new Vector([new Numeral(-1), new Numeral(1)])
      const v2 = new Vector([new Numeral(1), new Numeral(-1)])
      const result = Vector.cosine(v1, v2)
      const expected = new Numeral(-1)

      expect(result.equals(expected)).to.be.true
    })

    it('[2, 1] and [4, 2] = 1', () => {
      const v1 = new Vector([new Numeral(2), new Numeral(1)])
      const v2 = new Vector([new Numeral(4), new Numeral(2)])
      const result = Vector.cosine(v1, v2)
      const expected = new Numeral(1)

      expect(result.equals(expected)).to.be.true
    })

    it('[1, 2, 3] and [4, 5, 6] = 0.974631846...', () => {
      const v1 = new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])
      const v2 = new Vector([new Numeral(4), new Numeral(5), new Numeral(6)])
      const result = Vector.cosine(v1, v2)
      const expected = new Numeral(0.974631846)
      const precision = countDecimals(0.974631846)

      expect(result.equals(expected, precision)).to.be.true
    })

    it('[5.5, 2.5, 9.25] and [3.25, 5.25, 6.75] = 0.9244848...', () => {
      const v1 = new Vector([new Numeral(5.5), new Numeral(2.5), new Numeral(9.25)])
      const v2 = new Vector([new Numeral(3.25), new Numeral(5.25), new Numeral(6.75)])
      const result = Vector.cosine(v1, v2)
      const expected = new Numeral(0.9244848)
      const precision = countDecimals(0.9244848)

      expect(result.equals(expected, precision)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Vector', () => {
      it('Operands must be instances of Vector', () => {
        expect(() => Vector.cosine(1, 2)).to.throw(
          TypeError,
          'Arguments must be instances of Vector'
        )
      })

      it('Vectors must have the same size', () => {
        const v1 = new Vector([new Numeral(1), new Numeral(2)])
        const v2 = new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])

        expect(() => Vector.cosine(v1, v2)).to.throw(
          AssertionError,
          'Vectors must be of the same size'
        )
      })

      it('Vectors size must be equal to 2 or above', () => {
        const v1 = new Vector()
        const v2 = new Vector()

        expect(() => Vector.cosine(v1, v2)).to.throw(
          AssertionError,
          'Vectors must be of at least size 2.'
        )
      })

      it('Vectors must be different from 0', () => {
        const v1 = new Vector([new Numeral(0), new Numeral(0)])
        const v2 = new Vector([new Numeral(0), new Numeral(0)])

        expect(() => Vector.cosine(v1, v2)).to.throw(
          AssertionError,
          'Vectors must not be zero vectors.'
        )
      })
    })
  })
}
