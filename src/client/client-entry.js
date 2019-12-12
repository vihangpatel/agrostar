import React from 'react'
import { hydrate } from 'react-dom'

import AppWithRedux from './index'
import "../styles/index.scss"

hydrate(<AppWithRedux />, document.querySelector('#root-app'))