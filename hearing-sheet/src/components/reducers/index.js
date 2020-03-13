import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import events from './events.js'

export default combineReducers({ events, form })
