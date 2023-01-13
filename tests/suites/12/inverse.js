import { expect } from 'chai'
import { AssertionError } from 'node:assert'

import { Matrix, Vector, Numeral } from '#classes'
import { countDecimals } from '#utils'

export default () => {
  describe('Matrix', () => {
    it('[[1, 0, 0], [0, 1, 0], [0, 0, 1]] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(1), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(1)]),
      ])
      const result = matrix.inverse()
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(1), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(1)]),
      ])

      expect(result.equals(expected)).to.be.true
    })

    it('[[2, 0, 0], [0, 2, 0], [0, 0, 2]] = [[0.5, 0, 0], [0, 0.5, 0], [0, 0, 0.5]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(2), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(2), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(2)]),
      ])
      const result = matrix.inverse()
      const expected = new Matrix([
        new Vector([new Numeral(0.5), new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0.5), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0), new Numeral(0.5)]),
      ])

      expect(result.equals(expected)).to.be.true
    })

    it('[[8, 5, -2], [4, 7, 20], [7, 6, 1]] = [[0.649425..., 0.097701..., -0.655172...], [-0.781609..., -0.1264..., 0.965517...], [0.143678..., 0.07471..., -020689655...]]', () => {
      const matrix = new Matrix([
        new Vector([new Numeral(8), new Numeral(5), new Numeral(-2)]),
        new Vector([new Numeral(4), new Numeral(7), new Numeral(20)]),
        new Vector([new Numeral(7), new Numeral(6), new Numeral(1)]),
      ])
      const result = matrix.inverse()
      const matrix00 = new Numeral(0.649425)
      const precision00 = countDecimals(0.649425)
      const matrix01 = new Numeral(0.097701)
      const precision01 = countDecimals(0.097701)
      const matrix02 = new Numeral(-0.655172)
      const precision02 = countDecimals(-0.655172)
      const matrix10 = new Numeral(-0.781609)
      const precision10 = countDecimals(-0.781609)
      const matrix11 = new Numeral(-0.1264)
      const precision11 = countDecimals(-0.1264)
      const matrix12 = new Numeral(0.965517)
      const precision12 = countDecimals(0.965517)
      const matrix20 = new Numeral(0.143678)
      const precision20 = countDecimals(0.143678)
      const matrix21 = new Numeral(0.07471)
      const precision21 = countDecimals(0.07471)
      const matrix22 = new Numeral(-0.20689655)
      const precision22 = countDecimals(-0.20689655)

      expect(result.matrix.at(0).vector.at(0).equals(matrix00, precision00)).to.be.true
      expect(result.matrix.at(0).vector.at(1).equals(matrix01, precision01)).to.be.true
      expect(result.matrix.at(0).vector.at(2).equals(matrix02, precision02)).to.be.true
      expect(result.matrix.at(1).vector.at(0).equals(matrix10, precision10)).to.be.true
      expect(result.matrix.at(1).vector.at(1).equals(matrix11, precision11)).to.be.true
      expect(result.matrix.at(1).vector.at(2).equals(matrix12, precision12)).to.be.true
      expect(result.matrix.at(2).vector.at(0).equals(matrix20, precision20)).to.be.true
      expect(result.matrix.at(2).vector.at(1).equals(matrix21, precision21)).to.be.true
      expect(result.matrix.at(2).vector.at(2).equals(matrix22, precision22)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Matrix', () => {
      it('Matrix must be square', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(4), new Numeral(5), new Numeral(6)]),
        ])

        expect(() => matrix.inverse()).to.throw(
          AssertionError,
          'Matrix must be square.'
        )
      })

      it('Matrix must be invertible', () => {
        const matrix = new Matrix([
          new Vector([new Numeral(1), new Numeral(2), new Numeral(3)]),
          new Vector([new Numeral(4), new Numeral(5), new Numeral(6)]),
          new Vector([new Numeral(7), new Numeral(8), new Numeral(9)]),
        ])

        const determinant = matrix.determinant()

        expect(() => matrix.inverse()).to.throw(
          AssertionError,
          'Matrix must not be singular.'
        )
      })
    })
  })
}
