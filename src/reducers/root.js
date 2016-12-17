import { combineReducers } from 'redux'

import user                from './user'
import feed                from './photoFeed'
import popularPhotos       from './popularPhotos'

function makeRootReducer() {

  let rootReducer= combineReducers({
    user,
    feed,
    popularPhotos
  })

  return rootReducer
}

export default makeRootReducer
