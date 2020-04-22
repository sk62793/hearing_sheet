import { put, take } from 'redux-saga/effects'
import {
    REQUEST_UPDATE_BRIEFING_FORM,
    SUCCESS_UPDATE_BRIEFING_FORM,
    REQUEST_ADD_ANSWER,
    SUCCESS_ADD_ANSWER,
} from '../actions';
import firebase, { db } from '../configureFirebase';
import { fetchPost, fetchDelete } from './fetch';
import { filePath, uploadGCS, deleteGCS } from '../config/gcs_config';

interface QueryProps {
    choices?: [],
    file: any,
    path?: string,
    question: string,
    type: string
}

export function* updateBriefingForm() {
    while (true) {
        const action = yield take(REQUEST_UPDATE_BRIEFING_FORM)
        let values = action.payload.values
        const previousQueries = action.payload.previousQueries
        let newQueries = values.queries
        const id = action.payload.id
        const props = action.payload.props

        // ↓GCS上の古いfile、pathを消去
        previousQueries.map((query: QueryProps, index:number) => {
            if (query.type === 'image' && (typeof newQueries[index] === 'undefined' || newQueries[index].type !== 'image')) {
                let url = `${deleteGCS}${id}${index}`;
                fetchDelete(url)
            }
        })

        // ↓queries内の画像をGCSにアップロードする
        newQueries.map((query: QueryProps, index: number) => {
            if (query.type === 'image' && query.file !== null) {
                let url = `${uploadGCS}${id}${index}`;
                let file = query.file[0]
                fetchPost(url, file)

                // ↓file型はfirestoreに保存できないので、ここで削除する
                newQueries[index].file = null
                props.change(`queries.${index}.file`, null)

                // ↓GCSのpathを追加
                let path = `${filePath}${id}${index}?folder&hl=ja&organizationId`
                newQueries[index].path = path
                props.change(`queries.${index}.path`, path)
            }
        })

        // ↓firestoreをupdate
        db.collection("forms").doc(`${id}`).update({
            title: values.title,
            description: values.description,
            queries: newQueries,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        yield put({ type: SUCCESS_UPDATE_BRIEFING_FORM });
    }
}

export function* addAnswerAtFirestore() {
    while (true) {
        const action = yield take(REQUEST_ADD_ANSWER)
        const values = action.payload.values
        db.collection("form").doc("answer").set({
            answers: values.queries,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        yield put({ type: SUCCESS_ADD_ANSWER });
    }
}
