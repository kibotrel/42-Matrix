import innerProduct from './inner-product.js'
import dotProduct from './dot-product.js'

export const ex03 = {
  name: 'Exercise 03',
  callback: () => {
    describe('Dot product', dotProduct)
    describe('Inner product', innerProduct)
  },
}
