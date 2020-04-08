import { LOAD } from '../actions/index.js'

export default function loadReducer (state = {}, action) {
    switch (action.type) {
        case LOAD:
            console.log('loading...')
            return {
                forms: action.data
            }
        default:
            return state;
    }
}
