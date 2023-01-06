import { expect } from 'chai'

import { Numeral } from '#classes'

export default () => {
  describe('Numeral', () => {
    it('2 / 2 = 1', () => {
      const a = new Numeral(2)
      const b = new Numeral(2)
      const result = a.divide(b)
      const expected = new Numeral(1)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('2.5 / 0.25 = 10', () => {
      const a = new Numeral(2.5)
      const b = new Numeral(0.25)
      const result = a.divide(b)
      const expected = new Numeral(10)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('2.5 / 5 = 0.5', () => {
      const a = new Numeral(2.5)
      const b = new Numeral(5)
      const result = a.divide(b)
      const expected = new Numeral(0.5)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('(4 + i) / (2 + 2i) = 1.25 - 0.75i', () => {
      const a = new Numeral(4, 1)
      const b = new Numeral(2, 2)
      const result = a.divide(b)
      const expected = new Numeral(1.25, -0.75)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('(4.25 + i) / (2.75 + 0.5i) = 1.56 + 0.08i', () => {
      const a = new Numeral(4.25, 1)
      const b = new Numeral(2.75, 0.5)
      const result = a.divide(b)
      const expected = new Numeral(1.56, 0.08)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Numeral', () => {
      it('Second operand must be a Numeral instance', () => {
        const a = new Numeral(2)
        const b = 2
        expect(() => a.divide(b)).to.throw(
          TypeError,
          'Argument must be an instance of Numeral.'
        )
      })

      it('Cannot divide by zero', () => {
        const a = new Numeral(2)
        const b = new Numeral(0)
        expect(() => a.divide(b)).to.throw(
          RangeError,
          'Cannot divide by zero.'
        )
      })
    })
  })
}
