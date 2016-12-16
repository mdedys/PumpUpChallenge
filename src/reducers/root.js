import { combineReducers } from 'redux'

import user                from './user'

function makeRootReducer() {

  let rootReducer= combineReducers({
    user
  })

  return rootReducer
}

export default makeRootReducer
