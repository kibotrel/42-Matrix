import { expect } from 'chai'

import { Matrix, Vector, Numeral } from '#classes'


export default () => {
  describe('Matrix', () => {
    it('[[1, 0, 0], [0, 1, 0], [0, 0, 1]] = 3', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(1)]),
      ])
      const result = matrix.rank()
      const expected = new Numeral(3)

      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 2, 0, 0], [2, 4, 0, 0], [-1, 2, 1, 1]] = 2', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(2), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(2), new Numeral(4), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(-1), new Numeral(2), new Numeral(1), new Numeral(1)]),
      ])
      const result = matrix.rank()
      const expected = new Numeral(2)

      expect(result.equals(expected)).to.be.true
    })

    it('[[8, 5, -2], [4, 7, 20], [7, 6, 1], [21, 18, 7]] = 3', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(8), new Numeral(5), new Numeral(-2)]),
        new Vector([new Numeral(4), new Numeral(7), new Numeral(20)]),
        new Vector([new Numeral(7), new Numeral(6), new Numeral(1)]),
        new Vector([new Numeral(21), new Numeral(18), new Numeral(7)]),
      ])
      const result = matrix.rank()
      const expected = new Numeral(3)

      expect(result.equals(expected)).to.be.true
    })

    it('[[4 + 5i, 2, -3.5i], [2 + 2i, 0, 1], [2.8, 0.4, 3i]] = 3', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(4, 5), new Numeral(2), new Numeral(0, -3.5)]),
        new Vector([new Numeral(2, 2), new Numeral(0), new Numeral(1)]),
        new Vector([new Numeral(2), new Numeral(0.4), new Numeral(0, 3)]),
      ])
      const result = matrix.rank()
      const expected = new Numeral(3)

      expect(result.equals(expected)).to.be.true
    })
  })
}
