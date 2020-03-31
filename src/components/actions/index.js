export const CREATE_FORM_REQUESTED = 'CREATE_FORM_REQUESTED';
export const CREATE_FORM_SUCCESS = 'CREATE_FORM_SUCCESS';
export const SEND_ANSWER_REQUESTED = 'SEND_ANSWER_REQUESTED';
export const SEND_ANSWER_SUCCESS = 'SEND_ANSWER_SUCCESS';

export const createFormRequest = (values) => {
    return {
        type: CREATE_FORM_REQUESTED,
        payload: {values}
    }
}

export const createFormSuccess = () => {
    return {
        type: CREATE_FORM_SUCCESS
    }
}

export const sendAnswerRequest = (values) => {
    return {
        type: SEND_ANSWER_REQUESTED,
        payload: {values}
    }
}

export const sendAnswerSuccess = () => {
    return {
        type: SEND_ANSWER_SUCCESS
    }
}
