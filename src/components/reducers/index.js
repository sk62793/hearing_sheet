import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import sendFormReducer from './sendForm.js'
import sendAnswerReducer from './sendForm.js'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const reducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    sendFormReducer,
    sendAnswerReducer,
    form
});

export default reducer;
