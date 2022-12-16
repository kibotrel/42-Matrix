import { expect } from 'chai'
import util from 'util'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Constructor', () => {
    it('Name', () => {
      const matrix = new Matrix()

      expect(matrix.constructor.name).to.equal('Matrix')
    })

    it('Properties', () => {
      const matrix = new Matrix()

      expect(matrix).to.be.an('object')
      expect(matrix).to.have.property('matrix')
      expect(matrix.matrix).to.be.an('array')
      expect(matrix).to.have.property('rows')
      expect(matrix.rows).to.be.a('number')
      expect(matrix).to.have.property('columns')
      expect(matrix.columns).to.be.a('number')
      expect(matrix).to.have.property('shape')
      expect(matrix.shape).to.be.instanceOf(Vector)
    })

    it('Default values', () => {
      const matrix = new Matrix()

      expect(matrix.matrix).to.be.empty
      expect(matrix.rows).to.equal(0)
      expect(matrix.columns).to.equal(0)
      expect(matrix.shape.equals(new Vector([new Numeral(0), new Numeral(0)])))
        .to.be.true
    })
  })

  describe('Instance methods', () => {
    it('Print', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property(util.inspect.custom)
      expect(matrix[util.inspect.custom]()).to.be.a('string')
    })

    it('Add', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('add')
      expect(matrix.add).to.be.a('function')
    })

    it('Subtract', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('subtract')
      expect(matrix.subtract).to.be.a('function')
    })

    it('Scale', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('scale')
      expect(matrix.scale).to.be.a('function')
    })

    it('isSquare', () => {
      const matrix = new Matrix()

      expect(matrix).to.have.property('isSquare')
      expect(matrix.isSquare).to.be.a('function')
    })
  })
}
