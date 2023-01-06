import divide from './divide.js'
import manhattanDistance from './manhattan-distance.js'
import euclideanNorm from './euclidean-norm.js'
import supremumNorm from './supremum-norm.js'

export const ex04 = {
  name: 'Exercise 04',
  callback: () => {
    describe('Divide', divide)
    describe('Manhattan Distance', manhattanDistance)
    describe('Euclidean Norm', euclideanNorm)
    describe('Supremum Norm', supremumNorm)
  },
}
