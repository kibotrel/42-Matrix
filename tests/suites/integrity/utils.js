import { expect } from 'chai'

import { fixDecimals, countDecimals, abs } from '#utils'

export default () => {
  describe('FixDecimals', () => {
    it('Default behaviour', () => {
      const result = fixDecimals(1.23456789)
      const expected = 1.23456789

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })

    it('Zero decimals', () => {
      const result = fixDecimals(1.23456789, 0)
      const expected = 1

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })

    it('One decimal', () => {
      const result = fixDecimals(1.23456789, 1)
      const expected = 1.2

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })

    it('Many decimals', () => {
      const result = fixDecimals(1.23456789, 4)
      const expected = 1.2346

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })
  })

  describe('CountDecimals', () => {
    it('Zero decimals', () => {
      const result = countDecimals(1)
      const expected = 0

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })

    it('One decimal', () => {
      const result = countDecimals(1.2)
      const expected = 1

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })

    it('Many decimals', () => {
      const result = countDecimals(1.23456789)
      const expected = 8

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })
  })

  describe('Abs', () => {
    it('Positive number', () => {
      const result = abs(1)
      const expected = 1

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })

    it('Negative number', () => {
      const result = abs(-1)
      const expected = 1

      expect(result).to.be.a('number')
      expect(result).to.equal(expected)
    })
  })

  describe('Errors', () => {
    describe('FixDecimals', () => {
      it('Input must be instance of Number', () => {
        expect(() => fixDecimals('1.23456789')).to.throw(
          TypeError,
          'Argument must be a number.'
        )
      })

      it('Input must be finite', () => {
        expect(() => fixDecimals(Infinity)).to.throw(
          TypeError,
          'Argument must be finite.'
        )
      })

      it('Precision must be instance of Number', () => {
        expect(() => fixDecimals(1.23456789, '1')).to.throw(
          TypeError,
          'Argument must be a number.'
        )
      })

      it('Precision must be finite', () => {
        expect(() => fixDecimals(1.23456789, Infinity)).to.throw(
          TypeError,
          'Argument must be finite.'
        )
      })
    })

    describe('CountDecimals', () => {
      it('Input must be instance of Number', () => {
        expect(() => countDecimals('1.23456789')).to.throw(
          TypeError,
          'Argument must be a number.'
        )
      })

      it('Input must be finite', () => {
        expect(() => countDecimals(Infinity)).to.throw(
          TypeError,
          'Argument must be finite.'
        )
      })
    })
  })
}