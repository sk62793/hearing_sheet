import { CREATE_FORM_REQUESTED } from '../actions/index.js';
import { CREATE_FORM_SUCCESS } from '../actions/index.js';
import { CREATE_FORM_FAILURE } from '../actions/index.js';
import { READ_FORM } from '../actions/index.js';

function reducer (values = {}, action) {
    switch (action.type) {
        case CREATE_FORM_REQUESTED:
            console.log('reducerリクエスト！！！')
            return values;
        case CREATE_FORM_SUCCESS:
            console.log('成功！！！')
            return values;
        case CREATE_FORM_FAILURE:
            console.log('もうわからん、、、')
            return values;
        case READ_FORM:
            console.log('reducer失敗！！！')
            return values
        default:
            return values
    }
}

export default reducer;
