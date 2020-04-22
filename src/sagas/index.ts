import { fork } from 'redux-saga/effects'
import {
    updateBriefingForm,
    addAnswerAtFirestore
} from './BriefingSaga'

export default function* rootSaga() {
    yield fork(updateBriefingForm);
    yield fork(addAnswerAtFirestore);
}
