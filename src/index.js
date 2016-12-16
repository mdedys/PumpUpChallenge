import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'

import CreateStore  from './store/createStore'
import Root         from './components/root'

const store = CreateStore()

ReactDOM.render(
  <Provider store = { store } >
    <Root />
  </Provider>,
  document.getElementById( 'root' )
)
