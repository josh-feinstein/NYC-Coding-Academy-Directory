import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/root'

const rootElement = document.getElementById('main')
render(
  <Provider store={store}>
    <Root />
  </Provider>,
  rootElement
)
