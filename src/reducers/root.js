import { combineReducers } from 'redux'

import feeds               from './feeds'
import popularPhotos       from './popularPhotos'
import users               from './users'

export default makeRootReducer

function makeRootReducer() {

  let rootReducer = combineReducers({
    feeds,
    popularPhotos,
    users
  })

  return rootReducer
}


