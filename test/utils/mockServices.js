import nock               from 'nock'

import Api                from '../../src/constants/api'
import ApiHelpers         from '../../src/services/helpers/api'

export default {
  mockFetchFeedPhotos: mockFetchFeedPhotos,
  mockFetchPopularPhotos: mockFetchPopularPhotos,
  mockFetchProfile: mockFetchProfile
}

function mockFetchFeedPhotos() {
  return nock( ApiHelpers.createUrl( Api.endpoints.feedPhotos ) )
      .post( '', ApiHelpers.createPayload({
        'isThumbnailsOnly' : true,
        'limit'            : 5,
        'userId'           : 2707798,
        '_method'          : 'POST',
      }))
}

function mockFetchPopularPhotos() {
  return nock( ApiHelpers.createUrl( Api.endpoints.popularPhotos ) )
      .post( '', ApiHelpers.createPayload({
        'isThumbnailsOnly' : true,
        'limit'            : 18,
        '_method'          : 'POST',
      }))
}

function mockFetchProfile() {
  return nock( ApiHelpers.createUrl( Api.endpoints.userProfile, '318381' ) )
    .post( '', ApiHelpers.createPayload( { '_method': 'GET' } ) )
}