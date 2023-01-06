import { AssertionError } from 'node:assert'

import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'
import { countDecimals } from '#utils'

export default () => {
  describe('Vector', () => {
    it('[0, 0, 0] = 0', () => {
      const vector = new Vector([new Numeral(0), new Numeral(0), new Numeral(0)])
      const result = vector.supremumNorm()
      const expected = new Numeral(0)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('[1, 2, 3] = 3', () => {
      const vector = new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])
      const result = vector.supremumNorm()
      const expected = new Numeral(3)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('[-1, -2] = 2', () => {
      const vector = new Vector([new Numeral(-1), new Numeral(-2)])
      const result = vector.supremumNorm()
      const expected = new Numeral(2)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('[1.5, 2.7, 3.3] = 3.3', () => {
      const vector = new Vector([new Numeral(1.5), new Numeral(2.7), new Numeral(3.3)])
      const result = vector.supremumNorm()
      const expected = new Numeral(3.3)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('[i, 3 + 4i] = 5', () => {
      const vector = new Vector([new Numeral(0, 1), new Numeral(3, 4)])
      const result = vector.supremumNorm()
      const expected = new Numeral(5)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('[2.5, 4.5i] = 4.5', () => {
      const vector = new Vector([new Numeral(2.5), new Numeral(0, 4.5)])
      const result = vector.supremumNorm()
      const expected = new Numeral(4.5)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })
  })
}
