import { CREATE_FORM } from '../actions/index.js';

function reducer (events = {}, action) {
    switch (action.type) {
        case CREATE_FORM:
            return events
        default:
            return events
    }
}

export default reducer;
