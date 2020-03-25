import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import events from './events.js'

const reducer = combineReducers({
    events,
    form
});

export default reducer;
