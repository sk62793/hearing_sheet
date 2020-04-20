import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import sendAnswerReducer from './sendAnswer.js'
import updateBriefingFormReducer from './updateBriefingForm.js'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const reducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    sendAnswerReducer,
    updateBriefingFormReducer,
    form
});

export default reducer;
