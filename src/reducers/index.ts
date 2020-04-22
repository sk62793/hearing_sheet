import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import sendAnswerReducer from './sendAnswer'
import updateBriefingFormReducer from './updateBriefingForm'
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
