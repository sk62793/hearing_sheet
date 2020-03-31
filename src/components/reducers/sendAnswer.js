import {
    SEND_ANSWER_REQUESTED,
    SEND_ANSWER_SUCCESS,
} from '../actions/index.js';

export default function sendAnswerReducer (values = {}, action) {
    switch (action.type) {
        case SEND_ANSWER_REQUESTED:
            console.log('reducerリクエスト！！！')
            return values;
        case SEND_ANSWER_SUCCESS:
            console.log('成功！！！')
            return values;
        default:
            return values
    }
}
