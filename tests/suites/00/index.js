import add from './add.js'
import subtract from './subtract.js'
import multiply from './multiply.js'
// import scale from './scale.js'

export const ex00 = {
  name: 'Exercise 00',
  callback: () => {
    describe('Add', add)
    describe('Subtract', subtract)
    describe('Multiply', multiply)
    // describe('Scale', scale)
  },
}
