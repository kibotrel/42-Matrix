import { expect } from 'chai'

import { Numeral, Vector, Matrix } from '#classes'

export default () => {
  describe('Matrix', () => {
    it('[[1, 0], [0, 1]] = [[1, 0], [0, 1]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1)]),
      ])
      const result = matrix.transpose()

      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 2]] = [[1], [2]]', () => {
      const matrix = new Matrix([new Vector([new Numeral(1), new Numeral(2)])])
      const expected = new Matrix([
        new Vector([new Numeral(1)]),
        new Vector([new Numeral(2)]),
      ])
      const result = matrix.transpose()

      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 2], [3, 4]] = [[1, 3], [2,4]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(2)]),
        new Vector([new Numeral(3), new Numeral(4)]),
      ])
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(3)]),
        new Vector([new Numeral(2), new Numeral(4)]),
      ])
      const result = matrix.transpose()

      expect(result.equals(expected)).to.be.true
    })

    it('[[1, 2], [3, 4], [5, 6]] = [[1, 3, 5], [2, 4, 6]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1.9), new Numeral(9.5), new Numeral(-1.4)]),
        new Vector([new Numeral(-0.5), new Numeral(2.4), new Numeral(7.1)]),
        new Vector([new Numeral(9.7), new Numeral(6.6), new Numeral(-0.1)]),
      ])
      const expected = new Numeral(4.2)
      const result = matrix.trace()

      expect(result.equals(expected)).to.be.true
    })
  })
}
