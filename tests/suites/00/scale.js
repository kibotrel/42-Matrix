import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Vector', () => {
    it('[2, 3] * 2 = [4, 6]', () => {
      const a = new Vector([new Numeral(2), new Numeral(3)])
      const b = new Numeral(2)
      const result = a.scale(b)
      const expected = new Vector([new Numeral(4), new Numeral(6)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[2.5, 3.5] * 2.5 = [6.25, 8.75]', () => {
      const a = new Vector([new Numeral(2.5), new Numeral(3.5)])
      const b = new Numeral(2.5)
      const result = a.scale(b)
      const expected = new Vector([new Numeral(6.25), new Numeral(8.75)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[4 + 2i, -3 + i] * (4 + 2i) = [12 + 16i, -14 - 2i]', () => {
      const a = new Vector([new Numeral(4, 2), new Numeral(-3, 1)])
      const b = new Numeral(4, 2)
      const result = a.scale(b)
      const expected = new Vector([new Numeral(12, 16), new Numeral(-14, -2)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[4.75 + 2i, -3.5 + i] * (4.75 + 2i) = [18.5625 + 19i, -18.625 - 2.25i]', () => {
      const a = new Vector([new Numeral(4.75, 2), new Numeral(-3.5, 1)])
      const b = new Numeral(4.75, 2)
      const result = a.scale(b)
      const expected = new Vector([new Numeral(18.5625, 19), new Numeral(-18.625, -2.25)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Matrix', () => {
    it('[[1, 2], [3, 4]] * 2 = [[2, 4], [6, 8]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(1), new Numeral(2)]),
        new Vector([new Numeral(3), new Numeral(4)])
      ])
      const b = new Numeral(2)
      const result = a.scale(b)
      const expected = new Matrix([
        new Vector([new Numeral(2), new Numeral(4)]),
        new Vector([new Numeral(6), new Numeral(8)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[1.5, 2.5], [3.5, 4.5]] * 2.5 = [[3.75, 6.25], [8.75, 11.25]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(1.5), new Numeral(2.5)]),
        new Vector([new Numeral(3.5), new Numeral(4.5)])
      ])
      const b = new Numeral(2.5)
      const result = a.scale(b)
      const expected = new Matrix([
        new Vector([new Numeral(3.75), new Numeral(6.25)]),
        new Vector([new Numeral(8.75), new Numeral(11.25)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[1 + 2i, 2 + 3i], [3 + 4i, 4 + 5i]] * (1 + 2i) = [[3 + 4i, -4 + 7i], [-5 + 10i, -6 + 13i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(1, 2), new Numeral(2, 3)]),
        new Vector([new Numeral(3, 4), new Numeral(4, 5)])
      ])
      const b = new Numeral(1, 2)
      const result = a.scale(b)
      const expected = new Matrix([
        new Vector([new Numeral(-3, 4), new Numeral(-4, 7)]),
        new Vector([new Numeral(-5, 10), new Numeral(-6, 13)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[1.5 + 2i, 2 + 3.5i], [3.5 + 4i, 4 + 4.5i]] * (1.5 + 2i) = [[-1.75 + 6i, -4 + 9.25i], [-2.75 + 13i, -3 + 14.75i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(1.5, 2), new Numeral(2, 3.5)]),
        new Vector([new Numeral(3.5, 4), new Numeral(4, 4.5)])
      ])
      const b = new Numeral(1.5, 2)
      const result = a.scale(b)
      const expected = new Matrix([
        new Vector([new Numeral(-1.75, 6), new Numeral(-4, 9.25)]),
        new Vector([new Numeral(-2.75, 13), new Numeral(-3, 14.75)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Vector', () => {
      it('Second operand must be a Numeral instance', () => {
        const a = new Vector([new Numeral(2)])
        const b = new Vector([new Numeral(2)])

        expect(() => a.scale(b)).to.throw(TypeError, 'Argument must be an instance of Numeral.')
      })
    })

    describe('Matrix', () => {
      it('Second operand must be a Numeral instance', () => {
        const a = new Matrix([new Numeral(2)])
        const b = new Vector([new Numeral(2)])

        expect(() => a.scale(b)).to.throw(TypeError, 'Argument must be an instance of Numeral.')
      })
    })
  })
}
