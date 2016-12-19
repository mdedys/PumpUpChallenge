import { createStore, applyMiddleware } from 'redux'
import Thunk                            from 'redux-thunk'

import MakeRootReducer                  from '../reducers/root'

function _createStore() {

  let store = createStore(
    MakeRootReducer(),
    applyMiddleware( Thunk )
  )

  return store
}

export default _createStore