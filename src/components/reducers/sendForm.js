import {
    CREATE_FORM_REQUESTED,
    CREATE_FORM_SUCCESS,
} from '../actions/index.js';

export default function sendFormReducer (values = {}, action) {
    switch (action.type) {
        case CREATE_FORM_REQUESTED:
            console.log('reducerリクエスト！！！')
            return values;
        case CREATE_FORM_SUCCESS:
            console.log('成功！！！')
            return values;
        default:
            return values
    }
}
