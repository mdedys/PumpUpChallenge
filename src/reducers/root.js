import { combineReducers } from 'redux'

import user                from './user'
import feed                from './photoFeed'

function makeRootReducer() {

  let rootReducer= combineReducers({
    user,
    feed
  })

  return rootReducer
}

export default makeRootReducer
