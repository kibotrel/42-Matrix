import { expect } from 'chai'

import { Vector, Numeral } from '#classes'
import { countDecimals } from '#utils'

export default () => {
  describe('Vector', () => {
    it('[0, 0, 0] = 0', () => {
      const vector = new Vector([new Numeral(0), new Numeral(0), new Numeral(0)])
      const result = vector.euclideanNorm()
      const expected = new Numeral(0)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('[1, 2, 3] = 3.741657...', () => {
      const vector = new Vector([new Numeral(1), new Numeral(2), new Numeral(3)])
      const result = vector.euclideanNorm()
      const expected = new Numeral(3.741657)
      const precision = countDecimals(3.741657)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected, precision)).to.be.true
    })

    it('[-1, -2] = 2.236067977...', () => {
      const vector = new Vector([new Numeral(-1), new Numeral(-2)])
      const result = vector.euclideanNorm()
      const expected = new Numeral(2.236067977)
      const precision = countDecimals(2.236067977)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected, precision)).to.be.true
    })

    it('[1.5, 2.7, 3.3] = 4.51996...', () => {
      const vector = new Vector([new Numeral(1.5), new Numeral(2.7), new Numeral(3.3)])
      const result = vector.euclideanNorm()
      const expected = new Numeral(4.51996)
      const precision = countDecimals(4.51996)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected, precision)).to.be.true
    })

    it('[i, 3 + 4i] = 6', () => {
      const a = new Vector([new Numeral(0, 1), new Numeral(3, 4)])
      const c = a.manhattanDistance()
      const expected = new Numeral(6)
      expect(c).to.be.an.instanceOf(Numeral)
      expect(c.equals(expected)).to.be.true
    })

    it('[2.5, 4.5i] = 7', () => {
      const a = new Vector([new Numeral(2.5), new Numeral(0, 4.5)])
      const c = a.manhattanDistance()
      const expected = new Numeral(7)
      expect(c).to.be.an.instanceOf(Numeral)
      expect(c.equals(expected)).to.be.true
    })
  })
}
