import { createStore, applyMiddleware } from 'redux'
import Thunk                            from 'redux-thunk'

import MakeRootReducer                  from '../reducers/root'

export default _createStore


/**
 * Create the store with applicable middleware for the application
 *
 * @return {Object} The created store
 */
function _createStore() {

  let store = createStore(
    MakeRootReducer(),
    applyMiddleware(Thunk)
  )

  return store
}
