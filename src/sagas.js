import { call, put, take, fork, takeEvery } from 'redux-saga/effects'
import {
    CREATE_FORM_REQUESTED,
    CREATE_FORM_SUCCESS,
    SEND_ANSWER_REQUESTED,
    SEND_ANSWER_SUCCESS,
} from './components/actions';
import firebase, { db } from './Firebase';

function* createForm() {
    yield takeEvery(CREATE_FORM_REQUESTED, createFormValue)
}

function* createFormValue(action) {
        const values = action.payload.values
        db.collection("form").doc("question").set({
            title: values.title,
            description: values.description,
            querys: values.createForm,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        yield put({type: CREATE_FORM_SUCCESS});
}

function* sendAnswer() {
    yield takeEvery(SEND_ANSWER_REQUESTED, sendAnswerValue)
}

function* sendAnswerValue(action) {
        const values = action.payload.values
        db.collection("form").doc("answer").set({
            answers: values.querys,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        yield put({type: SEND_ANSWER_SUCCESS});
}

export default function* rootSaga() {
    yield fork(createForm);
    yield fork(sendAnswer)
}
