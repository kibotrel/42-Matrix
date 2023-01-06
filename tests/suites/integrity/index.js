import numerals from './numeral.js'
import vectors from './vector.js'
import matrices from './matrix.js'
import utils from './utils.js'

export const integrity = {
  name: 'Integrity',
  callback: () => {
    describe('Numeral', numerals)
    describe('Vector', vectors)
    describe('Matrix', matrices)
    describe('Utils', utils)
  },
}
