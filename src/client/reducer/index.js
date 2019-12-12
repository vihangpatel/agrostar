import { combineReducers } from 'redux'
import form1 from './form1'
import form2 from './form2'
import form3 from './form3'

const reducers = combineReducers({
    form1,
    form2,
    form3
})

export default reducers