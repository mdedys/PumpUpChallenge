import should     from 'should'

import Api        from '../../../src/constants/api'
import ApiHelpers from '../../../src/services/helpers/api'

describe( 'ApiHelpers', () => {
  const routeEndpoint = 'test/'

  describe( 'ApiHelpers.createUrl', () => {
    it ( 'should create url with param', () => {
      const param = '1'
      const expectedEndpoint = Api.endpoints.base + routeEndpoint + param

      let result = ApiHelpers.createUrl( routeEndpoint, param )
      result.should.equal( expectedEndpoint )
    })


    it ( 'should create url with no param', () => {
      const expectedEndpoint = Api.endpoints.base + routeEndpoint

      let result = ApiHelpers.createUrl( routeEndpoint )
      result.should.equal( expectedEndpoint )
    })


    it ( 'should handle null param', () => {
      const expectedEndpoint = Api.endpoints.base + routeEndpoint

      let result = ApiHelpers.createUrl( routeEndpoint, null )
      result.should.equal( expectedEndpoint )
    })
  })
})