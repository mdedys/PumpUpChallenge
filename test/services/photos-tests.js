import nock               from 'nock'
import should             from 'should'

import PhotosService      from '../../src/services/photos'
import MockServices       from '../utils/mockServices'


describe( 'PhotosService', () => {

  describe( 'PhotosService.fetchFeedPhotos', () => {

    afterEach( () => {
      nock.cleanAll()
    })

    it( 'should receive successful response', () => {

      MockServices
        .mockFetchFeedPhotos()
        .reply( 200, { success: true } )

      return PhotosService
        .fetchFeedPhotos()
        .then( response => {
          response.success.should.be.true
        })
    })

    it( 'should catch failed request', () => {

      MockServices
        .mockFetchFeedPhotos()
        .reply( 404 )

      return PhotosService
        .fetchFeedPhotos()
        .catch( err => {
          err.status.should.equal( 404 )
        })
    })

  })


  describe( 'PhotosService.popularPhotos', () => {

    afterEach( () => {
      nock.cleanAll()
    })

    it( 'should receive successful response', () => {

      MockServices
        .mockFetchPopularPhotos()
        .reply( 200, { success: true } )

      return PhotosService
        .fetchPopularPhotos()
        .then( response => {
          response.success.should.be.true
        })
    })

    it( 'should catch failed request', () => {

      MockServices
        .mockFetchPopularPhotos()
        .reply( 400 )

      return PhotosService
        .fetchPopularPhotos()
        .catch( err => {
          err.status.should.equal( 400 )
        })
    })

  })
})

