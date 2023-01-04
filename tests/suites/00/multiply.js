import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Numeral', () => {
    it('2 * 2 = 4', () => {
      const a = new Numeral(2)
      const b = new Numeral(2)
      const result = a.multiply(b)
      const expected = new Numeral(4)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('2.5 * 2.5 = 6.25', () => {
      const a = new Numeral(2.5)
      const b = new Numeral(2.5)
      const result = a.multiply(b)
      const expected = new Numeral(6.25)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('i * i = -1', () => {
      const a = new Numeral(0, 1)
      const b = new Numeral(0, 1)
      const result = a.multiply(b)
      const expected = new Numeral(-1)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('(5 + 3i) * (7 + 4i) = 23 + 41i', () => {
      const a = new Numeral(5, 3)
      const b = new Numeral(7, 4)
      const result = a.multiply(b)
      const expected = new Numeral(23, 41)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('(4.75 + 2i) * (8 + i) = 36 + 20.75i', () => {
      const a = new Numeral(4.75, 2)
      const b = new Numeral(8, 1)
      const result = a.multiply(b)
      const expected = new Numeral(36, 20.75)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    it('Second operand must be a Numeral instance', () => {
      const a = new Numeral(2)
      const b = 1

      expect(() => a.multiply(b)).to.throw(
        TypeError,
        'Argument must be an instance of Numeral.'
      )
    })
  })
}
