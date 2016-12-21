import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'

import Root         from './components/root'
import CreateStore  from './store/createStore'


const store = CreateStore()

ReactDOM.render(
  <Provider store = {store} >
    <Root />
  </Provider>,
  document.getElementById('root')
)
