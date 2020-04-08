export const CREATE_FORM_REQUESTED = 'CREATE_FORM_REQUESTED';
export const CREATE_FORM_SUCCESS = 'CREATE_FORM_SUCCESS';
export const SEND_ANSWER_REQUESTED = 'SEND_ANSWER_REQUESTED';
export const SEND_ANSWER_SUCCESS = 'SEND_ANSWER_SUCCESS';
export const ADD_FORM_REQUESTED = 'ADD_FORM_REQUESTED';
export const ADD_FORM_SUCCESS = 'ADD_FORM_SUCCESS';
export const LOAD = 'LOAD';

export const addFormRequest = (values) => {
    return {
        type: ADD_FORM_REQUESTED,
        payload: {values}
    }
}

export const createFormRequest = (values, index) => {
    return {
        type: CREATE_FORM_REQUESTED,
        payload: {values, index}
    }
}
export const sendAnswerRequest = (values) => {
    return {
        type: SEND_ANSWER_REQUESTED,
        payload: {values}
    }
}

export const load = (data) => {
    return {
        type: LOAD,
        data
    }
}
