export const REQUEST_ADD_BRIEFING_FORM = 'REQUEST_ADD_BRIEFING_FORM';
export const SUCCESS_ADD_BRIEFING_FORM = 'SUCCESS_ADD_BRIEFING_FORM';

export const REQUEST_UPDATE_BRIEFING_FORM = 'REQUEST_UPDATE_BRIEFING_FORM';
export const SUCCESS_UPDATE_BRIEFING_FORM = 'SUCCESS_UPDATE_BRIEFING_FORM';

export const REQUEST_ADD_ANSWER = 'REQUEST_ADD_ANSWER';
export const SUCCESS_ADD_ANSWER = 'SUCCESS_ADD_ANSWER';

export const SUCCESS_DELETE_PATH = 'SUCCESS_DELETE_PATH'
export const SUCCESS_UPLOAD_FILE_TO_GCS = 'SUCCESS_UPLOAD_FILE_TO_GCS'
export const SUCCESS_UPDATE_FIRESTORE = 'SUCCESS_UPDATE_FIRESTORE'

export const requestAddBriefingForm = (values) => {
    return {
        type: REQUEST_ADD_BRIEFING_FORM,
        payload: {values}
    }
}

export const requestUpdateBriefingForm = (values, id, previousQueries, props) => {
    return {
        type: REQUEST_UPDATE_BRIEFING_FORM,
        payload: {values, id, previousQueries, props}
    }
}

export const sendAnswerRequest = (values) => {
    return {
        type: REQUEST_ADD_ANSWER,
        payload: {values}
    }
}
