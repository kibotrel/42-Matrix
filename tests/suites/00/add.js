import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Numeral', () => {
    it('2 + 3 = 5', () => {
      const a = new Numeral(2)
      const b = new Numeral(3)
      const result = a.add(b)
      const expected = new Numeral(5)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('2.5 + 3.5 = 6', () => {
      const a = new Numeral(2.5)
      const b = new Numeral(3.5)
      const result = a.add(b)
      const expected = new Numeral(6)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('(5 + 3i) + (7 + 4i) = 12 + 7i', () => {
      const a = new Numeral(0, 3.5)
      const b = new Numeral(0, 4.7)
      const result = a.add(b)
      const expected = new Numeral(0, 8.2)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('(4.75 + 2.25i) + (8.125 + 0.75i) = 12.875 + 3i', () => {
      const a = new Numeral(4.75, 2.25)
      const b = new Numeral(8.125, 0.75)
      const result = a.add(b)
      const expected = new Numeral(12.875, 3)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Vector', () => {
    it('[2, 3] + [5, 7] = [7, 10]', () => {
      const a = new Vector([new Numeral(2), new Numeral(3)])
      const b = new Vector([new Numeral(5), new Numeral(7)])
      const result = a.add(b)
      const expected = new Vector([new Numeral(7), new Numeral(10)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[2.5, 3.5] + [5.5, 7.75] = [8, 11.25]', () => {
      const a = new Vector([new Numeral(2.5), new Numeral(3.5)])
      const b = new Vector([new Numeral(5.5), new Numeral(7.75)])
      const result = a.add(b)
      const expected = new Vector([new Numeral(8), new Numeral(11.25)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[5 + 3i, 7 + 4i] + [2 + 5i, 3 + 6i] = [7 + 8i, 10 + 10i]', () => {
      const a = new Vector([new Numeral(5, 3), new Numeral(7, 4)])
      const b = new Vector([new Numeral(2, 5), new Numeral(3, 6)])
      const result = a.add(b)
      const expected = new Vector([new Numeral(7, 8), new Numeral(10, 10)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[4.75 + 2.25i, 8.125 + 0.75i] + [5.5 + 3.5i, 7.75 + 4.25i] = [10.25 + 5.75i, 15.875 + 5i]', () => {
      const a = new Vector([new Numeral(4.75, 2.25), new Numeral(8.125, 0.75)])
      const b = new Vector([new Numeral(5.5, 3.5), new Numeral(7.75, 4.25)])
      const result = a.add(b)
      const expected = new Vector([
        new Numeral(10.25, 5.75),
        new Numeral(15.875, 5),
      ])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Matrix', () => {
    it('[[1, 2], [3, 4]] + [[7, 4], [-2, 2]] = [[8, 6], [1, 6]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(1), new Numeral(2)]),
        new Vector([new Numeral(3), new Numeral(4)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(7), new Numeral(4)]),
        new Vector([new Numeral(-2), new Numeral(2)]),
      ])
      const result = a.add(b)
      const expected = new Matrix([
        new Vector([new Numeral(8), new Numeral(6)]),
        new Vector([new Numeral(1), new Numeral(6)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[[2.5, 3.5], [5.5, 7.75]] + [[5.5, 7.75], [2.5, 3.5]] = [[8, 11.25], [8, 11.25]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(2.5), new Numeral(3.5)]),
        new Vector([new Numeral(5.5), new Numeral(7.75)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(5.5), new Numeral(7.75)]),
        new Vector([new Numeral(2.5), new Numeral(3.5)]),
      ])
      const result = a.add(b)
      const expected = new Matrix([
        new Vector([new Numeral(8), new Numeral(11.25)]),
        new Vector([new Numeral(8), new Numeral(11.25)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[[5 + 3i, 7 + 4i], [2 + 5i, 3 + 6i]] + [[2 + 5i, 3 + 6i], [5 + 3i, 7 + 4i]] = [[7 + 8i, 10 + 10i], [7 + 8i, 10 + 10i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(5, 3), new Numeral(7, 4)]),
        new Vector([new Numeral(2, 5), new Numeral(3, 6)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(2, 5), new Numeral(3, 6)]),
        new Vector([new Numeral(5, 3), new Numeral(7, 4)]),
      ])
      const result = a.add(b)
      const expected = new Matrix([
        new Vector([new Numeral(7, 8), new Numeral(10, 10)]),
        new Vector([new Numeral(7, 8), new Numeral(10, 10)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })

    it('[[4.75 + 2.25i, 8.125 + 0.75i], [5.5 + 3.5i, 7.75 + 4.25i]] + [[5.5 + 3.5i, 7.75 + 4.25i], [4.75 + 2.25i, 8.125 + 0.75i]] = [[10.25 + 5.75i, 15.875 + 5i], [10.25 + 5.75i, 15.875 + 5i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(4.75, 2.25), new Numeral(8.125, 0.75)]),
        new Vector([new Numeral(5.5, 3.5), new Numeral(7.75, 4.25)]),
      ])
      const b = new Matrix([
        new Vector([new Numeral(5.5, 3.5), new Numeral(7.75, 4.25)]),
        new Vector([new Numeral(4.75, 2.25), new Numeral(8.125, 0.75)]),
      ])
      const result = a.add(b)
      const expected = new Matrix([
        new Vector([new Numeral(10.25, 5.75), new Numeral(15.875, 5)]),
        new Vector([new Numeral(10.25, 5.75), new Numeral(15.875, 5)]),
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result).to.deep.equal(expected)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Numeral', () => {
      it('Second operand must be a Numeral instance', () => {
        const a = new Numeral(1)
        const b = new Vector([new Numeral(2)])

        expect(() => a.add(b)).to.throw(
          TypeError,
          'Argument must be an instance of Numeral.'
        )
      })
    })

    describe('Vector', () => {
      it('Second operand must be a Vector instance', () => {
        const a = new Vector([new Numeral(1)])
        const b = [new Numeral(2)]

        expect(() => a.add(b)).to.throw(
          TypeError,
          'Argument must be an instance of Vector.'
        )
      })

      it('Vectors must be of the same size', () => {
        const a = new Vector([new Numeral(1)])
        const b = new Vector([new Numeral(2), new Numeral(3)])

        expect(() => a.add(b)).to.throw(
          Error,
          'Vectors must be of the same size.'
        )
      })
    })

    describe('Matrix', () => {
      it('Second operand must be a Matrix instance', () => {
        const a = new Matrix([new Vector([new Numeral(1)])])
        const b = [[new Numeral(2)]]

        expect(() => a.add(b)).to.throw(
          TypeError,
          'Argument must be an instance of Matrix.'
        )
      })

      it('Matrices must be of the same shape', () => {
        const a = new Matrix([new Vector([new Numeral(1)])])
        const b = new Matrix([
          new Vector([new Numeral(2)]),
          new Vector([new Numeral(3)]),
        ])

        expect(() => a.add(b)).to.throw(
          Error,
          'Matrices must be of the same shape.'
        )
      })
    })
  })
}
