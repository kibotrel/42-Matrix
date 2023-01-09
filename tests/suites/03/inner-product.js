import { AssertionError } from 'node:assert'

import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Vector', () => {
    it('[0, 0] · [1, 1] = 0', () => {
      const v1 = new Vector([new Numeral(0), new Numeral(0)])
      const v2 = new Vector([new Numeral(1), new Numeral(1)])
      const expected = new Numeral(0)

      expect(v1.innerProduct(v2).equals(expected)).to.be.true
    })

    it('[1, 1] · [1, 1] = 2', () => {
      const v1 = new Vector([new Numeral(1), new Numeral(1)])
      const v2 = new Vector([new Numeral(1), new Numeral(1)])
      const expected = new Numeral(2)

      expect(v1.innerProduct(v2).equals(expected)).to.be.true
    })

    it('[-1, 6] · [3, 2] = 9', () => {
      const v1 = new Vector([new Numeral(-1), new Numeral(6)])
      const v2 = new Vector([new Numeral(3), new Numeral(2)])
      const expected = new Numeral(9)

      expect(v1.innerProduct(v2).equals(expected)).to.be.true
    })

    it('[2 + i, 0, 4 - 5i] · [1 + i, 2 + i, 0] = 3 - i', () => {
      const v1 = new Vector([new Numeral(2, 1), new Numeral(0), new Numeral(4, -5)])
      const v2 = new Vector([new Numeral(1, 1), new Numeral(2, 1), new Numeral(0)])
      const expected = new Numeral(3, -1)

      expect(v1.innerProduct(v2).equals(expected)).to.be.true
    })

    it('[2 + i, 2.5, 4 - 5.5i] · [1 + i, 2.125 + i, 0] = 8.3125 - 3.5i', () => {
      const v1 = new Vector([
        new Numeral(2, 1),
        new Numeral(2.5),
        new Numeral(4, -5.5),
      ])
      const v2 = new Vector([
        new Numeral(1, 1),
        new Numeral(2.125, 1),
        new Numeral(0),
      ])
      const expected = new Numeral(8.3125, -3.5)

      expect(v1.innerProduct(v2).equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Vector', () => {
      it('Argument must be an instance of Vector', () => {
        const v1 = new Vector([new Numeral(0), new Numeral(0)])
        const v2 = new Matrix([v1])

        expect(() => v1.innerProduct(v2)).to.throw(
          TypeError,
          'Argument must be an instance of Vector.'
        )
      })

      it('Vectors must be of the same size', () => {
        const v1 = new Vector([new Numeral(0), new Numeral(0)])
        const v2 = new Vector([new Numeral(0)])

        expect(() => v1.innerProduct(v2)).to.throw(
          AssertionError,
          'Vectors must be of the same size.'
        )
      })

      it('Vectors must not be empty', () => {
        const v1 = new Vector([])
        const v2 = new Vector([])

        expect(() => v1.innerProduct(v2)).to.throw(
          AssertionError,
          'Vectors must not be empty.'
        )
      })
    })
  })
}
