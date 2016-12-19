import { combineReducers } from 'redux'

import user                from './user'
import popularPhotos       from './popularPhotos'

function makeRootReducer() {

  let rootReducer= combineReducers({
    user,
    popularPhotos
  })

  return rootReducer
}

export default makeRootReducer
