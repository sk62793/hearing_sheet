import { call, put, take, fork } from 'redux-saga/effects'
import {
    CREATE_FORM_REQUESTED,
    CREATE_FORM_SUCCESS,
    CREATE_FORM_FAILURE
} from './components/actions';
import firebase, { db } from './Firebase';

function* createForm(action) {
    while (true) {
        const action = yield take(CREATE_FORM_REQUESTED)
        const values = action.payload.values
        yield call(sendFormValue, values);
        yield put({type: CREATE_FORM_SUCCESS});
    }
}

export default function* rootSaga() {
    yield fork(createForm);
}

function sendFormValue(values) {
    console.log(values)
    db.collection("form").doc("values").set({
        title: values.title,
        description: values.description,
        querys: values.createForm,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}
