/**
 * Todo App Reducer
 */

// action types
import {
    SEARCH_UNIT,
    SEARCH_UNIT_SUCCESS,
    SEARCH_UNIT_FAILURE
    
} from '../actions/types';

// initial state
const INIT_STATE = {
    searchUnits: null,
    availablesearchUnits: null,
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        // get search
        case SEARCH_UNIT:
            return { ...state, searchUnits: null };

        // get search success
        case SEARCH_UNIT_SUCCESS:
            return { ...state, searchUnits: action.payload };

        // get search failure
        case SEARCH_UNIT_FAILURE:
            return {...state, searchUnits: null }

       
        
        default: return { ...state };
    }
}
