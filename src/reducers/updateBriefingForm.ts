import {
    REQUEST_UPDATE_BRIEFING_FORM,
    SUCCESS_UPDATE_BRIEFING_FORM,
} from '../actions';

export default function updateBriefingFormReducer (values = {}, action: any) {
    switch (action.type) {
        case REQUEST_UPDATE_BRIEFING_FORM:
            return values;
        case SUCCESS_UPDATE_BRIEFING_FORM:
            return values;
        default:
            return values
    }
}
