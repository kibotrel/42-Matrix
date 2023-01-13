import util from 'node:util'

import { expect } from 'chai'


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

    it('IsInteger', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('isInteger')
      expect(numeral.isInteger).to.be.a('function')
    })

    it('IsReal', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('isReal')
      expect(numeral.isReal).to.be.a('function')
    })

    it('IsComplex', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('isComplex')
      expect(numeral.isComplex).to.be.a('function')
    })

    it('Conjugate', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('conjugate')
      expect(numeral.conjugate).to.be.a('function')
    })

    it('Divide', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('divide')
      expect(numeral.divide).to.be.a('function')
    })

    it('Absolute', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('absolute')
      expect(numeral.absolute).to.be.a('function')
    })

    it('SquareRoot', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('squareRoot')
      expect(numeral.squareRoot).to.be.a('function')
    })

    it('IsZero', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('isZero')
      expect(numeral.isZero).to.be.a('function')
    })

    it('Clone', () => {
      const numeral = new Numeral()

      expect(numeral).to.have.property('clone')
      expect(numeral.clone).to.be.a('function')
    })
  })

  describe('Static methods', () => {
    it('Random', () => {
      expect(Numeral).to.have.property('random')
      expect(Numeral.random).to.be.a('function')
    })

    it('linearInterpolation', () => {
      expect(Numeral).to.have.property('linearInterpolation')
      expect(Numeral.linearInterpolation).to.be.a('function')
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

      expect(() => console.log(numeral)).to.throw(
        TypeError,
        'Argument must be a number.'
      )
    })

    it('Not a finite value', () => {
      const numeral = new Numeral(Infinity)

      expect(() => console.log(numeral)).to.throw(
        TypeError,
        'Argument must be finite.'
      )
    })

    it('Value between -1e-12 and 1e-12 rounded to 0', () => {
      const numeral = new Numeral(1e-13)

      expect(numeral.r).to.equal(0)
      expect(numeral.i).to.equal(0)

      const numeral2 = new Numeral(-1e-13)

      expect(numeral2.r).to.equal(0)
      expect(numeral2.i).to.equal(0)
    })
  })

  describe('Extra instance methods', () => {
    describe('Equals', () => {
      it('Equal', () => {
        const numeral1 = new Numeral(1)
        const numeral2 = new Numeral(1)

        expect(numeral1.equals(numeral2)).to.equal(true)
      })

      it('Not equal', () => {
        const numeral1 = new Numeral(1)
        const numeral2 = new Numeral(2)

        expect(numeral1.equals(numeral2)).to.equal(false)
      })

      it('Second operand must be a Numeral instance', () => {
        const numeral = new Numeral(1)

        expect(() => numeral.equals()).to.throw(
          TypeError,
          'Argument must be an instance of Numeral.'
        )
      })
    })

    describe('IsInteger', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)

        expect(numeral.isInteger()).to.equal(true)
      })

      it('Integer', () => {
        const numeral = new Numeral(1)

        expect(numeral.isInteger()).to.equal(true)
      })

      it('Real', () => {
        const numeral = new Numeral(1.1)

        expect(numeral.isInteger()).to.equal(false)
      })

      it('Imaginary', () => {
        const numeral = new Numeral(0, 1)

        expect(numeral.isInteger()).to.equal(false)
      })

      it('Complex', () => {
        const numeral = new Numeral(1, 1)

        expect(numeral.isInteger()).to.equal(false)
      })
    })

    describe('IsReal', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)

        expect(numeral.isReal()).to.equal(true)
      })

      it('Integer', () => {
        const numeral = new Numeral(1)

        expect(numeral.isReal()).to.equal(true)
      })

      it('Real', () => {
        const numeral = new Numeral(1.1)

        expect(numeral.isReal()).to.equal(true)
      })

      it('Imaginary', () => {
        const numeral = new Numeral(0, 1)

        expect(numeral.isReal()).to.equal(false)
      })

      it('Complex', () => {
        const numeral = new Numeral(1, 1)

        expect(numeral.isReal()).to.equal(false)
      })
    })

    describe('IsComplex', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)

        expect(numeral.isComplex()).to.equal(false)
      })

      it('Integer', () => {
        const numeral = new Numeral(1)

        expect(numeral.isComplex()).to.equal(false)
      })

      it('Real', () => {
        const numeral = new Numeral(1.1)

        expect(numeral.isComplex()).to.equal(false)
      })

      it('Imaginary', () => {
        const numeral = new Numeral(0, 1)

        expect(numeral.isComplex()).to.equal(true)
      })

      it('Complex', () => {
        const numeral = new Numeral(1, 1)

        expect(numeral.isComplex()).to.equal(true)
      })
    })

    describe('Conjugate', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)

        expect(numeral.conjugate().equals(numeral)).to.be.true
      })

      it('Integer', () => {
        const numeral = new Numeral(1)

        expect(numeral.conjugate().equals(numeral)).to.be.true
      })

      it('Real', () => {
        const numeral = new Numeral(1.1)

        expect(numeral.conjugate().equals(numeral)).to.be.true
      })

      it('Imaginary', () => {
        const numeral = new Numeral(0, 1)

        expect(numeral.conjugate().equals(new Numeral(0, -1))).to.be.true
      })

      it('Complex', () => {
        const numeral = new Numeral(1, 1)

        expect(numeral.conjugate().equals(new Numeral(1, -1))).to.be.true
      })
    })

    describe('Absolute', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)
        const expected = new Numeral(0)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Positive integer', () => {
        const numeral = new Numeral(1)
        const expected = new Numeral(1)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Negative integer', () => {
        const numeral = new Numeral(-1)
        const expected = new Numeral(1)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Positive real', () => {
        const numeral = new Numeral(1.1)
        const expected = new Numeral(1.1)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Negative real', () => {
        const numeral = new Numeral(-1.1)
        const expected = new Numeral(1.1)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Positive imaginary', () => {
        const numeral = new Numeral(0, 1)
        const expected = new Numeral(1)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Negative imaginary', () => {
        const numeral = new Numeral(0, -1)
        const expected = new Numeral(1)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Complex with positive real and imaginary parts', () => {
        const numeral = new Numeral(3, 4)
        const expected = new Numeral(5)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Complex with negative real part', () => {
        const numeral = new Numeral(-3, 4)
        const expected = new Numeral(5)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Complex with negative imaginary part', () => {
        const numeral = new Numeral(3, -4)
        const expected = new Numeral(5)

        expect(numeral.absolute().equals(expected)).to.be.true
      })

      it('Complex with negative real and imaginary parts', () => {
        const numeral = new Numeral(-3, -4)
        const expected = new Numeral(5)

        expect(numeral.absolute().equals(expected)).to.be.true
      })
    })

    describe('SquareRoot', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)
        const expected = new Numeral(0)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Positive integer', () => {
        const numeral = new Numeral(4)
        const expected = new Numeral(2)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Negative integer', () => {
        const numeral = new Numeral(-4)
        const expected = new Numeral(0, 2)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Positive real', () => {
        const numeral = new Numeral(2.25)
        const expected = new Numeral(1.5)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Negative real', () => {
        const numeral = new Numeral(-2.25)
        const expected = new Numeral(0, 1.5)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Positive imaginary', () => {
        const numeral = new Numeral(0, 8)
        const expected = new Numeral(2, 2)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Negative imaginary', () => {
        const numeral = new Numeral(0, -8)
        const expected = new Numeral(2, -2)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Complex with positive real and imaginary parts', () => {
        const numeral = new Numeral(3, 4)
        const expected = new Numeral(2, 1)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Complex with negative real part', () => {
        const numeral = new Numeral(-3, 4)
        const expected = new Numeral(1, 2)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Complex with negative imaginary part', () => {
        const numeral = new Numeral(3, -4)
        const expected = new Numeral(2, -1)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })

      it('Complex with negative real and imaginary parts', () => {
        const numeral = new Numeral(-3, -4)
        const expected = new Numeral(1, -2)

        expect(numeral.squareRoot().equals(expected)).to.be.true
      })
    })

    describe('IsZero', () => {
      it('Zero', () => {
        const numeral = new Numeral(0)

        expect(numeral.isZero()).to.be.true
      })

      it('Non-zero', () => {
        const numeral = new Numeral(1)

        expect(numeral.isZero()).to.be.false
      })
    })

    describe('Clone', () => {
      it('Clone equals original', () => {
        const original = new Numeral(1)
        const clone = original.clone()

        expect(original.equals(clone)).to.be.true
      })
    })
  })

  describe('Extra static methods', () => {
    describe('Random', () => {
      it('Default behaviour', () => {
        const numeral = Numeral.random()

        expect(numeral.r).to.be.a('number')
        expect(Number.isInteger(numeral.r)).to.equal(true)
        expect(numeral.i).to.be.a('number')
        expect(numeral.i).to.equal(0)
      })

      it('Generate a random real number', () => {
        const numeral = Numeral.random('real')

        expect(numeral.r).to.be.a('number')
        expect(Number.isInteger(numeral.r)).to.equal(false)
        expect(numeral.i).to.equal(0)
      })

      it('Generate a random imaginary integer', () => {
        const numeral = Numeral.random('imaginary-integer')

        expect(numeral.r).to.equal(0)
        expect(numeral.i).to.be.a('number')
        expect(Number.isInteger(numeral.i)).to.equal(true)
      })

      it('Generate a random imaginary decimal', () => {
        const numeral = Numeral.random('imaginary-decimal')

        expect(numeral.r).to.equal(0)
        expect(numeral.i).to.be.a('number')
        expect(Number.isInteger(numeral.i)).to.equal(false)
      })

      it('Generate a random complex integer', () => {
        const numeral = Numeral.random('complex-integer')

        expect(numeral.r).to.be.a('number')
        expect(Number.isInteger(numeral.r)).to.equal(true)
        expect(numeral.i).to.be.a('number')
        expect(Number.isInteger(numeral.i)).to.equal(true)
      })

      it('Generate a random complex decimal', () => {
        const numeral = Numeral.random('complex-decimal')

        expect(numeral.r).to.be.a('number')
        expect(Number.isInteger(numeral.r)).to.equal(false)
        expect(numeral.i).to.be.a('number')
        expect(Number.isInteger(numeral.i)).to.equal(false)
      })

      it('Invalid type of Numeral', () => {
        expect(() => Numeral.random('1')).to.throw(Error, 'Invalid type.')
      })
    })

  })
}
