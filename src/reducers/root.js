import { combineReducers } from 'redux'

import popularPhotos       from './popularPhotos'
import user                from './user'

export default makeRootReducer

function makeRootReducer() {

  let rootReducer= combineReducers({
    user,
    popularPhotos
  })

  return rootReducer
}


