import { expect } from 'chai'

import { Numeral, Vector, Matrix } from '#classes'
import { countDecimals } from '#utils'

export default () => {
  describe('Matrix', () => {
    it('[[], []] = [[], []]', () => {
      const matrix = new Matrix([new Vector([]), new Vector([])])
      const result = matrix.reducedRowEchelonForm()
      expect(result.equals(matrix)).to.be.true
    })

    it('[[0, 0], [0, 0]] = [[0, 0], [0, 0]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0)]),
      ])
      const result = matrix.reducedRowEchelonForm()
      expect(result.equals(matrix)).to.be.true
    })

    it('[[0, 1], [1, 1]] = [[1, 0], [0, 1]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(0), new Numeral(1)]),
        new Vector([new Numeral(1), new Numeral(1)]),
      ])
      const result = matrix.reducedRowEchelonForm()
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 0, 0], [0, 1, 0], [0, 0, 1]] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(1)]),
      ])
      const result = matrix.reducedRowEchelonForm()
      expect(result.equals(matrix)).to.be.true
    })

    it('[[1, 2], [3, 4]] = [[1, 0], [0, 1]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(2)]),
        new Vector([new Numeral(3), new Numeral(4)]),
      ])
      const result = matrix.reducedRowEchelonForm()
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      expect(result.equals(expected)).to.be.true
    })

    it('[[8, 5, -2, 4, 28], [4, 2.5, 20, 4, -4], [8, 5, 1, 4, 17]] = [[1, 0.625, 0, 0, -12.166666...], [0, 0, 1, 0, -3.66666...], [0, 0, 0, 1, 29.5]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(8), new Numeral(5), new Numeral(-2), new Numeral(4), new Numeral(28)]),
        new Vector([new Numeral(4), new Numeral(2.5), new Numeral(20), new Numeral(4), new Numeral(-4)]),
        new Vector([new Numeral(8), new Numeral(5), new Numeral(1), new Numeral(4), new Numeral(17)]),
      ])
      const result = matrix.reducedRowEchelonForm()
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(0.625), new Numeral(0), new Numeral(0), new Numeral(-12.16666)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(1), new Numeral(0), new Numeral(-3.66666)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(0), new Numeral(1), new Numeral(29.5)]),
      ])

      const row1 = new Vector(result.matrix.at(0).vector.splice(0, 4))
      const last1 = result.matrix.at(0).vector.pop()
      const expectedRow1 = new Vector([new Numeral(1), new Numeral(0.625), new Numeral(0), new Numeral(0)])
      const expectedLast1 = new Numeral(-12.16666)
      const precisionLast1 = countDecimals(-12.16666)
      const row2 = new Vector(result.matrix.at(1).vector.splice(0, 4))
      const last2 = result.matrix.at(1).vector.pop()
      const expectedRow2 = new Vector([new Numeral(0), new Numeral(0), new Numeral(1), new Numeral(0)])
      const expectedLast2 = new Numeral(-3.66666)
      const precisionLast2 = countDecimals(-3.66666)

      expect(row1.equals(expectedRow1)).to.be.true
      expect(last1.equals(expectedLast1, precisionLast1 - 1), 3).to.be.true
      expect(row2.equals(expectedRow2), 4).to.be.true
      expect(last2.equals(expectedLast2, precisionLast2 - 1), 5).to.be.true
      expect(result.matrix.at(2).equals(expected.matrix.at(2)), 6).to.be.true
    })

    it('[[-3 + i, 1 + 9i, 2 + 6i], [6 + 2i, -8 - 4i, 3 + 2i]] = [[1, 0, 1.24071... - 0.512082...i], [0, 1, 0.417286... -0.532528...i]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(-3, 1), new Numeral(1, 9), new Numeral(2, 6)]),
        new Vector([new Numeral(6, 2), new Numeral(-8, -4), new Numeral(3, 2)]),
      ])
      const result = matrix.reducedRowEchelonForm()
      const row1 = new Vector(result.matrix.at(0).vector.splice(0, 2))
      const last1 = result.matrix.at(0).vector.pop()
      const expectedRow1 = new Vector([new Numeral(1), new Numeral(0)])
      const expectedLast1 = new Numeral(1.24071, -0.512082)
      const precisionLast1 = Math.min(countDecimals(1.24071), countDecimals(-0.512082))
      const row2 = new Vector(result.matrix.at(1).vector.splice(0, 2))
      const last2 = result.matrix.at(1).vector.pop()
      const expectedRow2 = new Vector([new Numeral(0), new Numeral(1)])
      const expectedLast2 = new Numeral(0.417286, -0.532528)
      const precisionLast2 = Math.min(countDecimals(0.417286), countDecimals(-0.532528))

      expect(row1.equals(expectedRow1)).to.be.true
      expect(last1.equals(expectedLast1, precisionLast1)).to.be.true
      expect(row2.equals(expectedRow2)).to.be.true
      expect(last2.equals(expectedLast2, precisionLast2)).to.be.true
    })
  })
}
