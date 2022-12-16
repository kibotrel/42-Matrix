import { expect } from 'chai'
import util from 'util'

import { Vector, Numeral } from '#classes'

export default () => {
  describe('Constructor', () => {
    it('Name', () => {
      const vector = new Vector()

      expect(vector.constructor.name).to.equal('Vector')
    })

    it('Properties', () => {
      const vector = new Vector()

      expect(vector).to.be.an('object')
      expect(vector).to.have.property('vector')
      expect(vector.vector).to.be.an('array')
      expect(vector).to.have.property('size')
      expect(vector.size).to.be.a('number')
    })

    it('Default values', () => {
      const vector = new Vector()

      expect(vector.vector).to.be.empty
      expect(vector.size).to.equal(0)
    })
  })

  describe('Instance methods', () => {
    it('Print', () => {
      const vector = new Vector()

      expect(vector).to.have.property(util.inspect.custom)
      expect(vector[util.inspect.custom]()).to.be.a('string')
    })

    it('Add', () => {
      const vector = new Vector()

      expect(vector).to.have.property('add')
      expect(vector.add).to.be.a('function')
    })

    it('Subtract', () => {
      const vector = new Vector()

      expect(vector).to.have.property('subtract')
      expect(vector.subtract).to.be.a('function')
    })

    it('Scale', () => {
      const vector = new Vector()

      expect(vector).to.have.property('scale')
      expect(vector.scale).to.be.a('function')
    })

    it('Equals', () => {
      const vector = new Vector()

      expect(vector).to.have.property('equals')
      expect(vector.equals).to.be.a('function')
    })
  })

  describe('Static methods', () => {
    it('Random', () => {
      expect(Vector).to.have.property('random')
      expect(Vector.random).to.be.a('function')
    })
  })

  describe('Values', () => {
    it('Empty vector', () => {
      const vector = new Vector()

      expect(vector.vector).to.be.an('array')
      expect(vector.vector).to.be.empty
      expect(vector.size).to.equal(0)
    })

    it('Vector with one element', () => {
      const vector = new Vector([new Numeral(1)])

      expect(vector.vector).to.be.an('array')
      expect(vector.vector).to.have.lengthOf(1)
      expect(vector.vector[0]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[0].r).to.equal(1)
      expect(vector.vector[0].i).to.equal(0)
      expect(vector.size).to.equal(1)
    })

    it('Vector with many elements', () => {
      const vector = new Vector([
        new Numeral(1),
        new Numeral(2),
        new Numeral(3),
        new Numeral(4),
        new Numeral(5),
      ])

      expect(vector.vector).to.be.an('array')
      expect(vector.vector).to.have.lengthOf(5)
      expect(vector.vector[0]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[0].r).to.equal(1)
      expect(vector.vector[0].i).to.equal(0)
      expect(vector.vector[1]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[1].r).to.equal(2)
      expect(vector.vector[1].i).to.equal(0)
      expect(vector.vector[2]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[2].r).to.equal(3)
      expect(vector.vector[2].i).to.equal(0)
      expect(vector.vector[3]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[3].r).to.equal(4)
      expect(vector.vector[3].i).to.equal(0)
      expect(vector.vector[4]).to.be.an.instanceOf(Numeral)
      expect(vector.vector[4].r).to.equal(5)
      expect(vector.vector[4].i).to.equal(0)
      expect(vector.size).to.equal(5)
    })
  })
}
