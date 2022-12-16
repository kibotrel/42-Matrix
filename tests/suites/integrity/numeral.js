import { expect } from 'chai'
import util from 'util'

import { Numeral } from '#classes'

export default () => {
  describe('Constructor', () => {
    it('Name', () => {
      const numeral = new Numeral()

      expect(numeral.constructor.name).to.equal('Numeral')
    })

    it('Properties', () => {
      const numeral = new Numeral()

      expect(numeral).to.be.an('object')
      expect(numeral).to.have.property('r')
      expect(numeral.r).to.be.a('number')
      expect(numeral).to.have.property('i')
      expect(numeral.i).to.be.a('number')
    })

    it('Default values', () => {
      const numeral = new Numeral()

      expect(numeral.r).to.equal(0)
      expect(numeral.i).to.equal(0)
    })
  })

  describe('Instance methods', () => {
    it('Print', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property(util.inspect.custom)
      expect(numeral[util.inspect.custom]()).to.be.a('string')
    })

    it('Add', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('add')
      expect(numeral.add).to.be.a('function')
    })

    it('Subtract', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('subtract')
      expect(numeral.subtract).to.be.a('function')
    })

    it('Multiply', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('multiply')
      expect(numeral.multiply).to.be.a('function')
    })

    it('Equals', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('equals')
      expect(numeral.equals).to.be.a('function')
    })
  })

  describe('Static methods', () => {
    it('Random', () => {
      expect(Numeral).to.have.property('random')
      expect(Numeral.random).to.be.a('function')
    })
  })

  describe('Values', () => {
    describe('Natural number', () => {
      it('Positive', () => {
        const numeral = new Numeral(1)

        expect(numeral.r).to.equal(1)
        expect(numeral.i).to.equal(0)
      })

      it('Negative', () => {
        const numeral = new Numeral(-1)

        expect(numeral.r).to.equal(-1)
        expect(numeral.i).to.equal(0)
      })
    })

    describe('Real number', () => {
      it('Positive', () => {
        const numeral = new Numeral(1.1)

        expect(numeral.r).to.equal(1.1)
        expect(numeral.i).to.equal(0)
      })

      it('Negative', () => {
        const numeral = new Numeral(-1.1)

        expect(numeral.r).to.equal(-1.1)
        expect(numeral.i).to.equal(0)
      })
    })

    describe('Imaginary number', () => {
      it('Positive integer', () => {
        const numeral = new Numeral(0, 1)

        expect(numeral.r).to.equal(0)
        expect(numeral.i).to.equal(1)
      })

      it('Negative integer', () => {
        const numeral = new Numeral(0, -1)

        expect(numeral.r).to.equal(0)
        expect(numeral.i).to.equal(-1)
      })

      it('Positive decimal', () => {
        const numeral = new Numeral(0, 1.1)

        expect(numeral.r).to.equal(0)
        expect(numeral.i).to.equal(1.1)
      })

      it('Negative decimal', () => {
        const numeral = new Numeral(0, -1.1)

        expect(numeral.r).to.equal(0)
        expect(numeral.i).to.equal(-1.1)
      })
    })

    describe('Complex number', () => {
      it('Positive integers', () => {
        const numeral = new Numeral(1, 1)

        expect(numeral.r).to.equal(1)
        expect(numeral.i).to.equal(1)
      })

      it('Negative integers', () => {
        const numeral = new Numeral(-1, -1)

        expect(numeral.r).to.equal(-1)
        expect(numeral.i).to.equal(-1)
      })

      it('Positive decimals', () => {
        const numeral = new Numeral(1.1, 1.1)

        expect(numeral.r).to.equal(1.1)
        expect(numeral.i).to.equal(1.1)
      })

      it('Negative decimals', () => {
        const numeral = new Numeral(-1.1, -1.1)

        expect(numeral.r).to.equal(-1.1)
        expect(numeral.i).to.equal(-1.1)
      })

      it('Positive integer and decimal', () => {
        const numeral = new Numeral(1, 1.1)

        expect(numeral.r).to.equal(1)
        expect(numeral.i).to.equal(1.1)
      })

      it('Negative integer and decimal', () => {
        const numeral = new Numeral(-1, -1.1)

        expect(numeral.r).to.equal(-1)
        expect(numeral.i).to.equal(-1.1)
      })

      it('Positive decimal and integer', () => {
        const numeral = new Numeral(1.1, 1)

        expect(numeral.r).to.equal(1.1)
        expect(numeral.i).to.equal(1)
      })

      it('Negative decimal and integer', () => {
        const numeral = new Numeral(-1.1, -1)

        expect(numeral.r).to.equal(-1.1)
        expect(numeral.i).to.equal(-1)
      })

      it('Positive integer and negative decimal', () => {
        const numeral = new Numeral(1, -1.1)

        expect(numeral.r).to.equal(1)
        expect(numeral.i).to.equal(-1.1)
      })

      it('Negative integer and positive decimal', () => {
        const numeral = new Numeral(-1, 1.1)

        expect(numeral.r).to.equal(-1)
        expect(numeral.i).to.equal(1.1)
      })

      it('Positive decimal and negative integer', () => {
        const numeral = new Numeral(1.1, -1)

        expect(numeral.r).to.equal(1.1)
        expect(numeral.i).to.equal(-1)
      })

      it('Negative decimal and positive integer', () => {
        const numeral = new Numeral(-1.1, 1)

        expect(numeral.r).to.equal(-1.1)
        expect(numeral.i).to.equal(1)
      })
    })
  })

  describe('Errors', () => {
    it('Not a number', () => {
      const numeral = new Numeral('1')

      expect(() => console.log(numeral)).to.throw('Argument must be a number.')
    })

    it('Not a finite value', () => {
      const numeral = new Numeral(Infinity)

      expect(() => console.log(numeral)).to.throw('Argument must be finite.')
    })
  })
}
