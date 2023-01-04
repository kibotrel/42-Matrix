import { AssertionError } from 'node:assert'

import { expect } from 'chai'

import { Vector, Numeral, Matrix } from '#classes'

export default () => {
  describe('Numeral', () => {
    it('0 and 1 with 0 = 0', () => {
      const a = new Numeral(0)
      const b = new Numeral(1)
      const t = new Numeral(0)
      const result = Numeral.lerp(a, b, t)
      const expected = new Numeral(0)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('0 and 1 with 1 = 1', () => {
      const a = new Numeral(0)
      const b = new Numeral(1)
      const t = new Numeral(1)
      const result = Numeral.lerp(a, b, t)
      const expected = new Numeral(1)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('0 and 1 with 0.5 = 0.5', () => {
      const a = new Numeral(0)
      const b = new Numeral(1)
      const t = new Numeral(0.5)
      const result = Numeral.lerp(a, b, t)
      const expected = new Numeral(0.5)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('21 and 42 with 0.3 = 27.3', () => {
      const a = new Numeral(21)
      const b = new Numeral(42)
      const t = new Numeral(0.3)
      const result = Numeral.lerp(a, b, t)
      const expected = new Numeral(27.3)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })

    it('5 + 10i and 10 - 15i with 0.25 = 6.25 + 3.75i', () => {
      const a = new Numeral(5, 10)
      const b = new Numeral(10, -15)
      const t = new Numeral(0.25)
      const result = Numeral.lerp(a, b, t)
      const expected = new Numeral(6.25, 3.75)

      expect(result).to.be.an.instanceOf(Numeral)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Vector', () => {
    it('[0, 0] and [1, 1] with 0 = [0, 0]', () => {
      const a = new Vector([new Numeral(0), new Numeral(0)])
      const b = new Vector([new Numeral(1), new Numeral(1)])
      const t = new Numeral(0)
      const result = Vector.lerp(a, b, t)
      const expected = new Vector([new Numeral(0), new Numeral(0)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[0, 0] and [1, 1] with 1 = [1, 1]', () => {
      const a = new Vector([new Numeral(0), new Numeral(0)])
      const b = new Vector([new Numeral(1), new Numeral(1)])
      const t = new Numeral(1)
      const result = Vector.lerp(a, b, t)
      const expected = new Vector([new Numeral(1), new Numeral(1)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[0, 0] and [1, 1] with 0.5 = [0.5, 0.5]', () => {
      const a = new Vector([new Numeral(0), new Numeral(0)])
      const b = new Vector([new Numeral(1), new Numeral(1)])
      const t = new Numeral(0.5)
      const result = Vector.lerp(a, b, t)
      const expected = new Vector([new Numeral(0.5), new Numeral(0.5)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[2, 1] and [4, 2] with 0.3 = [2.6, 1.3]', () => {
      const a = new Vector([new Numeral(2), new Numeral(1)])
      const b = new Vector([new Numeral(4), new Numeral(2)])
      const t = new Numeral(0.3)
      const result = Vector.lerp(a, b, t)
      const expected = new Vector([new Numeral(2.6), new Numeral(1.3)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })

    it('[2 + 1i, 1 + 2i] and [4 + 2i, 2 + 3i] with 0.5 = [3 + 1.5i, 1.5 + 2.5i]', () => {
      const a = new Vector([new Numeral(2, 1), new Numeral(1, 2)])
      const b = new Vector([new Numeral(4, 2), new Numeral(2, 3)])
      const t = new Numeral(0.5)
      const result = Vector.lerp(a, b, t)
      const expected = new Vector([new Numeral(3, 1.5), new Numeral(1.5, 2.5)])

      expect(result).to.be.an.instanceOf(Vector)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Matrix', () => {
    it('[[0, 0], [0, 0]] and [[1, 1], [1, 1]] with 0 = [[0, 0], [0, 0]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0)])
      ])
      const b = new Matrix([
        new Vector([new Numeral(1), new Numeral(1)]),
        new Vector([new Numeral(1), new Numeral(1)])
      ])
      const t = new Numeral(0)
      const result = Matrix.lerp(a, b, t)
      const expected = new Matrix([
        new Vector([new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[0, 0], [0, 0]] and [[1, 1], [1, 1]] with 1 = [[1, 1], [1, 1]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0)])
      ])
      const b = new Matrix([
        new Vector([new Numeral(1), new Numeral(1)]),
        new Vector([new Numeral(1), new Numeral(1)])
      ])
      const t = new Numeral(1)
      const result = Matrix.lerp(a, b, t)
      const expected = new Matrix([
        new Vector([new Numeral(1), new Numeral(1)]),
        new Vector([new Numeral(1), new Numeral(1)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[0, 0], [0, 0]] and [[1, 1], [1, 1]] with 0.5 = [[0.5, 0.5], [0.5, 0.5]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(0), new Numeral(0)]),
        new Vector([new Numeral(0), new Numeral(0)])
      ])
      const b = new Matrix([
        new Vector([new Numeral(1), new Numeral(1)]),
        new Vector([new Numeral(1), new Numeral(1)])
      ])
      const t = new Numeral(0.5)
      const result = Matrix.lerp(a, b, t)
      const expected = new Matrix([
        new Vector([new Numeral(0.5), new Numeral(0.5)]),
        new Vector([new Numeral(0.5), new Numeral(0.5)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[2, 1], [3, 4]] and [[20, 10], [30, 40]] with 0.5 = [[11, 5.5], [16.5, 22]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(2), new Numeral(1)]),
        new Vector([new Numeral(3), new Numeral(4)])
      ])
      const b = new Matrix([
        new Vector([new Numeral(20), new Numeral(10)]),
        new Vector([new Numeral(30), new Numeral(40)])
      ])
      const t = new Numeral(0.5)
      const result = Matrix.lerp(a, b, t)
      const expected = new Matrix([
        new Vector([new Numeral(11), new Numeral(5.5)]),
        new Vector([new Numeral(16.5), new Numeral(22)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })

    it('[[2 + 1i, 1 + 2i], [3 + 3i, 4 + 4i]] and [[20 + 10i, 10 + 20i], [30 + 30i, 40 + 40i]] with 0.5 = [[11 + 5.5i, 5.5 + 11i], [16.5 + 16.5i, 22 + 22i]]', () => {
      const a = new Matrix([
        new Vector([new Numeral(2, 1), new Numeral(1, 2)]),
        new Vector([new Numeral(3, 3), new Numeral(4, 4)])
      ])
      const b = new Matrix([
        new Vector([new Numeral(20, 10), new Numeral(10, 20)]),
        new Vector([new Numeral(30, 30), new Numeral(40, 40)])
      ])
      const t = new Numeral(0.5)
      const result = Matrix.lerp(a, b, t)
      const expected = new Matrix([
        new Vector([new Numeral(11, 5.5), new Numeral(5.5, 11)]),
        new Vector([new Numeral(16.5, 16.5), new Numeral(22, 22)])
      ])

      expect(result).to.be.an.instanceOf(Matrix)
      expect(result.equals(expected)).to.be.true
    })
  })

  describe('Errors', () => {
    describe('Numeral', () => {
      it('Arguments must be instances of Numeral', () => {
        expect(() => Numeral.lerp(0, 2, 0.5)).to.throw(
          TypeError,
          'Arguments must be instances of Numeral'
        )
      })

      it('Interpolation factor must be an instance of Numeral', () => {
        expect(() => Numeral.lerp(new Numeral(0), new Numeral(2), 0.5)).to.throw(
          TypeError,
          'Arguments must be instances of Numeral.'
        )
      })

      it('Interpolation factor must be a real number', () => {
        expect(() => Numeral.lerp(new Numeral(0), new Numeral(2), new Numeral(1, 1))).to.throw(
          TypeError,
          'Interpolation factor must be real.'
        )
      })

      it('Interpolation factor must be between 0 and 1', () => {
        expect(() => Numeral.lerp(new Numeral(0), new Numeral(2), new Numeral(2))).to.throw(
          RangeError,
          'Interpolation factor must be between 0 and 1.'
        )
      })
    })

    describe('Vector', () => {
      it('Arguments must be instances of Vector', () => {
        expect(() => Vector.lerp(0, 2, 0.5)).to.throw(
          TypeError,
          'Arguments must be instances of Vector'
        )
      })

      it('Interpolation factor must be an instance of Numeral', () => {
        expect(() => Vector.lerp(new Vector(), new Vector(), 0.5)).to.throw(
          TypeError,
          'Interpolation factor must be an instance of Numeral.'
        )
      })

      it('Interpolation factor must be a real number', () => {
        expect(() => Vector.lerp(new Vector(), new Vector(), new Numeral(1, 1))).to.throw(
          TypeError,
          'Interpolation factor must be real.'
        )
      })

      it('Interpolation factor must be between 0 and 1', () => {
        expect(() => Vector.lerp(new Vector(), new Vector(), new Numeral(2))).to.throw(
          RangeError,
          'Interpolation factor must be between 0 and 1.'
        )
      })

      it('Vectors must be of the same size', () => {
        expect(() => Vector.lerp(new Vector(), new Vector(new Numeral(1)), new Numeral(1))).to.throw(
          AssertionError,
          'Vectors must be of the same size.'
        )
      })
    })

    describe('Matrix', () => {
      it('Arguments must be instances of Matrix', () => {
        expect(() => Matrix.lerp(0, 2, 0.5)).to.throw(
          TypeError,
          'Arguments must be instances of Matrix'
        )
      })

      it('Interpolation factor must be an instance of Numeral', () => {
        expect(() => Matrix.lerp(new Matrix(), new Matrix(), 0.5)).to.throw(
          TypeError,
          'Interpolation factor must be an instance of Numeral.'
        )
      })

      it('Interpolation factor must be a real number', () => {
        expect(() => Matrix.lerp(new Matrix(), new Matrix(), new Numeral(1, 1))).to.throw(
          TypeError,
          'Interpolation factor must be real.'
        )
      })

      it('Interpolation factor must be between 0 and 1', () => {
        expect(() => Matrix.lerp(new Matrix(), new Matrix(), new Numeral(2))).to.throw(
          RangeError,
          'Interpolation factor must be between 0 and 1.'
        )
      })

      it('Matrices must be of the same shape', () => {
        expect(() => Matrix.lerp(new Matrix(), new Matrix([new Vector([new Numeral()])]), new Numeral(1))).to.throw(
          AssertionError,
          'Matrices must be of the same shape.'
        )
      })
    })
  })
}
