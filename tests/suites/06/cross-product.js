import { expect } from 'chai'
import { AssertionError } from 'node:assert'

import { Numeral, Vector } from '#classes'

export default () => {
  describe('Vector', () => {
    it('[0, 0, 1] × [1, 0, 0] = [0, 1, 0]', () => {
      const v1 = new Vector([new Numeral(0), new Numeral(0), new Numeral(1)])
      const v2 = new Vector([new Numeral(1), new Numeral(0), new Numeral(0)])
      const result = Vector.crossProduct(v1, v2)
      const expected = new Vector([new Numeral(0), new Numeral(1), new Numeral(0)])

      expect(result.equals(expected)).to.be.true
    })

    it('[1, 2, 3] × [4, 5, 6] = [-3, 6, -3]', () => {
      const v1 = new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])
      const v2 = new Vector([new Numeral(4), new Numeral(5), new Numeral(6)])
      const result = Vector.crossProduct(v1, v2)
      const expected = new Vector([new Numeral(-3), new Numeral(6), new Numeral(-3)])

      expect(result.equals(expected)).to.be.true
    })

    it('[4, 2, -3] × [-2, -5, 16] = [17, -58, -16]', () => {
      const v1 = new Vector([new Numeral(4), new Numeral(2), new Numeral(-3)])
      const v2 = new Vector([new Numeral(-2), new Numeral(-5), new Numeral(16)])
      const result = Vector.crossProduct(v1, v2)
      const expected = new Vector([new Numeral(17), new Numeral(-58), new Numeral(-16)])

      expect(result.equals(expected)).to.be.true
    })

    it('[3 + i, 2 - 7i, 3i] × [2i, 4 + 3i, 5 + 5i] = [54 - 37i, -16 - 20i, -5 + 9i]', () => {
      const v1 = new Vector([
        new Numeral(3, 1),
        new Numeral(2, -7),
        new Numeral(0, 3)
      ])
      const v2 = new Vector([
        new Numeral(0, 2),
        new Numeral(4, 3),
        new Numeral(5, 5)
      ])
      const result = Vector.crossProduct(v1, v2)
      const expected = new Vector([
        new Numeral(54, -37),
        new Numeral(-16, -20),
        new Numeral(-5, 9)
      ])

      expect(result.equals(expected)).to.be.true
    })

    it('[3.25 + 0.5i, 2 - 7.5i, 3.25i] × [2i, 4 + 3.25i, 0.5 + 5i] = [49.0625 - 6.75i, -5.625 - 16.5i, -3.625 + 8.5625i]', () => {
      const v1 = new Vector([
        new Numeral(3.25, 0.5),
        new Numeral(2, -7.5),
        new Numeral(0, 3.25)
      ])
      const v2 = new Vector([
        new Numeral(0, 2),
        new Numeral(4, 3.25),
        new Numeral(0.5, 5)
      ])
      const result = Vector.crossProduct(v1, v2)
      const expected = new Vector([
        new Numeral(49.0625, -6.75),
        new Numeral(-5.625, -16.5),
        new Numeral(-3.625, 8.5625)
      ])

      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Vector', () => {
      it('Operands must be instances of Vector', () => {
        expect(() => Vector.crossProduct(1, 2)).to.throw(
          TypeError,
          'Arguments must be instances of Vector'
        )
      })

      it('Vectors must have the same size', () => {
        const v1 = new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])
        const v2 = new Vector([new Numeral(4), new Numeral(5)])

        expect(() => Vector.crossProduct(v1, v2)).to.throw(
          AssertionError,
          'Vectors must be of the same size'
        )
      })

      it('Vectors must be of size 3', () => {
        const v1 = new Vector([new Numeral(1), new Numeral(2)])
        const v2 = new Vector([new Numeral(4), new Numeral(5)])

        expect(() => Vector.crossProduct(v1, v2)).to.throw(
          AssertionError,
          'Vectors must be of size 3'
        )
      })
    })
  })
}
