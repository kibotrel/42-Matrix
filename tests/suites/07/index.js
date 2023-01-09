import multiplyVector from './multiply-vector.js'
import multiplyMatrix from './multiply-matrix.js'

export const ex07 = {
  name: 'Exercise 07',
  callback: () => {
    describe('MultiplyVector', multiplyVector)
    describe('MultiplyMatrix', multiplyMatrix)
  },
}
