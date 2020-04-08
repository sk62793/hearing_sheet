import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import sendFormReducer from './sendForm.js'
import sendAnswerReducer from './sendForm.js'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import loadReducer from './load.js'

const reducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    sendFormReducer,
    sendAnswerReducer,
    data: loadReducer,
    form
});

export default reducer;
