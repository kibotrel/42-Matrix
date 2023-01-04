import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Numeral', () => {
    it('2 - 3 = -1', () => {
      const a = new Numeral(2)
      const b = new Numeral(3)
      const result = a.subtract(b)
      const expected = new Numeral(-1)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('2.5 - 3.5 = -1', () => {
      const a = new Numeral(2.5)
      const b = new Numeral(3.5)
      const result = a.subtract(b)
      const expected = new Numeral(-1)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('(5 + 3i) - (7 + 4i) = -2 - i', () => {
      const a = new Numeral(5, 3)
      const b = new Numeral(7, 4)
      const result = a.subtract(b)
      const expected = new Numeral(-2, -1)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('(4.75 + 2.25i) - (8.125 + 0.75i) = -3.375 + 1.5i', () => {
      const a = new Numeral(4.75, 2.25)
      const b = new Numeral(8.125, 0.75)
      const result = a.subtract(b)
      const expected = new Numeral(-3.375, 1.5)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Vector', () => {
    it('[2, 3] - [5, 7] = [-3, -4]', () => {
      const a = new Vector([new Numeral(2), new Numeral(3)])
      const b = new Vector([new Numeral(5), new Numeral(7)])
      const result = a.subtract(b)
      const expected = new Vector([new Numeral(-3), new Numeral(-4)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[2.5, 3.5] - [5.5, 7.5] = [-3, -4]', () => {
      const a = new Vector([new Numeral(2.5), new Numeral(3.5)])
      const b = new Vector([new Numeral(5.5), new Numeral(7.5)])
      const result = a.subtract(b)
      const expected = new Vector([new Numeral(-3), new Numeral(-4)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[5 + 3i, 7 + 4i] - [8 + 2i, 9 + i] = [-3 - i, -2 + 3i]', () => {
      const a = new Vector([new Numeral(5, 3), new Numeral(7, 4)])
      const b = new Vector([new Numeral(8, 2), new Numeral(9, 1)])
      const result = a.subtract(b)
      const expected = new Vector([new Numeral(-3, 1), new Numeral(-2, 3)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[4.75 + 2.25i, 8.125 + 0.75i] - [5.5 + 3i, 7.5 + 4i] = [-0.75 - 0.75i, 0.625 - 3.25i]', () => {
      const a = new Vector([new Numeral(4.75, 2.25), new Numeral(8.125, 0.75)])
      const b = new Vector([new Numeral(5.5, 3), new Numeral(7.5, 4)])
      const result = a.subtract(b)
      const expected = new Vector([
        new Numeral(-0.75, -0.75),
        new Numeral(0.625, -3.25),
      ])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Matrix', () => {
    it('[[2, 3], [5, 7]] - [[5, 7], [8, 9]] = [[-3, -4], [-3, -2]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(2), new Numeral(3)]),
        new Vector([new Numeral(5), new Numeral(7)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(5), new Numeral(7)]),
        new Vector([new Numeral(8), new Numeral(9)]),
      ])
      const result = a.subtract(b)
      const expected = new Matrix([
        new Vector([new Numeral(-3), new Numeral(-4)]),
        new Vector([new Numeral(-3), new Numeral(-2)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[[2.5, 3.5], [5.5, 7.5]] - [[5.5, 7.5], [8.5, 9.5]] = [[-3, -4], [-3, -2]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(2.5), new Numeral(3.5)]),
        new Vector([new Numeral(5.5), new Numeral(7.5)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(5.5), new Numeral(7.5)]),
        new Vector([new Numeral(8.5), new Numeral(9.5)]),
      ])
      const result = a.subtract(b)
      const expected = new Matrix([
        new Vector([new Numeral(-3), new Numeral(-4)]),
        new Vector([new Numeral(-3), new Numeral(-2)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[[5 + 3i, 7 + 4i], [8 + 2i, 9 + i]] - [[8 + 2i, 9 + i], [5 + 3i, 7 + 4i]] = [[-3 + i, -2 + 3i], [3 - i, 2 - 3i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(5, 3), new Numeral(7, 4)]),
        new Vector([new Numeral(8, 2), new Numeral(9, 1)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(8, 2), new Numeral(9, 1)]),
        new Vector([new Numeral(5, 3), new Numeral(7, 4)]),
      ])
      const result = a.subtract(b)
      const expected = new Matrix([
        new Vector([new Numeral(-3, 1), new Numeral(-2, 3)]),
        new Vector([new Numeral(3, -1), new Numeral(2, -3)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[[4.75 + 2.25i, 8.125 + 0.75i], [5.5 + 3i, 7.5 + 4i]] - [[5.5 + 3i, 7.5 + 4i], [8.5 + 2i, 9.5 + i]] = [[-0.75 - 0.75i, 0.625 - 3.25i], [-3 + i, -2 + 3i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(4.75, 2.25), new Numeral(8.125, 0.75)]),
        new Vector([new Numeral(5.5, 3), new Numeral(7.5, 4)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(5.5, 3), new Numeral(7.5, 4)]),
        new Vector([new Numeral(8.5, 2), new Numeral(9.5, 1)]),
      ])
      const result = a.subtract(b)
      const expected = new Matrix([
        new Vector([new Numeral(-0.75, -0.75), new Numeral(0.625, -3.25)]),
        new Vector([new Numeral(-3, 1), new Numeral(-2, 3)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Numeral', () => {
      it('Second operand must be a Numeral instance', () => {
        const a = new Numeral(2)
        const b = 2

        expect(() => a.subtract(b)).to.throw(
          TypeError,
          'Argument must be an instance of Numeral.'
        )
      })
    })

    describe('Vector', () => {
      it('Second operand must be a Vector instance', () => {
        const a = new Vector([new Numeral(2)])
        const b = 2

        expect(() => a.subtract(b)).to.throw(
          TypeError,
          'Argument must be an instance of Vector.'
        )
      })

      it('Vectors must be of the same size', () => {
        const a = new Vector([new Numeral(2)])
        const b = new Vector([new Numeral(2), new Numeral(2)])

        expect(() => a.subtract(b)).to.throw(
          Error,
          'Vectors must be of the same size.'
        )
      })
    })

    describe('Matrix', () => {
      it('Second operand must be a Matrix instance', () => {
        const a = new Matrix([
          new Vector([new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(5), new Numeral(7)]),
        ])
        const b = 2

        expect(() => a.subtract(b)).to.throw(
          TypeError,
          'Argument must be an instance of Matrix.'
        )
      })

      it('Matrices must be of the same shape', () => {
        const a = new Matrix([
          new Vector([new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(5), new Numeral(7)]),
        ])
        const b = new Matrix([
          new Vector([new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(5), new Numeral(7)]),
          new Vector([new Numeral(5), new Numeral(7)]),
        ])

        expect(() => a.subtract(b)).to.throw(
          Error,
          'Matrices must be of the same shape.'
        )
      })
    })
  })
}
