import { call, put, take, fork, takeEvery } from 'redux-saga/effects'
import {
    ADD_FORM_REQUESTED,
    ADD_FORM_SUCCESS,
    CREATE_FORM_REQUESTED,
    CREATE_FORM_SUCCESS,
    SEND_ANSWER_REQUESTED,
    SEND_ANSWER_SUCCESS,
} from './components/actions';
import firebase, { db } from './Firebase';

function* addNewForm() {
    yield takeEvery(ADD_FORM_REQUESTED, addForm)
}

function* addForm(action) {
    const values = action.payload.values
    const index = values.index
    const querys = []
    db.collection('forms').doc(`${index}`).set({
        index: values.index,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        title: '',
        description: '',
        querys: querys
    })
    yield put({type: ADD_FORM_SUCCESS})
}

function* createForm() {
    yield takeEvery(CREATE_FORM_REQUESTED, createFormValue)
}

function* createFormValue(action) {
    const values = action.payload.values
    const id = action.payload.index
    db.collection("forms").doc(`${id}`).update({
        title: values.title,
        description: values.description,
        querys: values.querys,
        //createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
    yield fork(addNewForm);
    yield fork(createForm);
    yield fork(sendAnswer)
}
