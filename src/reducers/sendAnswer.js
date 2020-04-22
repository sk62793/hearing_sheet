import {
    REQUEST_ADD_ANSWER,
    SUCCESS_ADD_ANSWER,
} from '../actions';

export default function sendAnswerReducer (values = {}, action) {
    switch (action.type) {
        case REQUEST_ADD_ANSWER:
            console.log('reducerリクエスト！！！')
            return values;
        case SUCCESS_ADD_ANSWER:
            console.log('成功！！！')
            return values;
        default:
            return values
    }
}
