import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { suites } from './suites/index.js'

chai.use(chaiAsPromised)

for (const { name, callback } of suites) {
  describe(name, callback)
}
