import { combineReducers } from 'redux'

import feeds               from './feeds'
import popularPhotos       from './popularPhotos'
import users               from './user'

export default makeRootReducer

function makeRootReducer() {

  let rootReducer= combineReducers({
    feeds,
    popularPhotos,
    users
  })

  return rootReducer
}


