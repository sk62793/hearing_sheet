import { fork } from 'redux-saga/effects'
import {
    updateBriefingForm,
    addAnswerAtFirestore
} from './BriefingSaga.js'

export default function* rootSaga() {
    yield fork(updateBriefingForm);
    yield fork(addAnswerAtFirestore);
}
