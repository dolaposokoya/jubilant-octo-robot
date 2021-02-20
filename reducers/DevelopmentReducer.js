/**
 * Todo App Reducer
 */

// action types
import {
    GET_DEVELOPMENT,
    GET_ALL_DEVELOPMENT,
    GET_ALL_DEVELOPMENT_SUCCESS,
    GET_ALL_DEVELOPMENT_FAILURE,
    GET_DEVELOPMENT_SUCCESS,
    GET_DEVELOPMENT_FAILURE,
    SELECT_DEVELOPMENT_OPTION,
    GET_DEVELOPMENT_UNIT,
    GET_DEVELOPMENT_UNIT_SUCCESS,
    GET_DEVELOPMENT_UNIT_FAILURE,
    SET_STATUS,
    SET_STATUS_SUCCESS,
    SET_STATUS_FAILURE,
    AVAILABLE_SEARCH_UNIT,
    AVAILABLE_SEARCH_UNIT_SUCCESS,
    AVAILABLE_SEARCH_UNIT_FAILURE
} from '../actions/types';

// initial state
const INIT_STATE = {
    developmentDetail: null,
    alldevelopmentDetail: null,
    developmentUnitDetail: null,
    loading: false,
    childSelect: 'brochure',
    parentSelect: 'marketing',
    availablesearchUnits: null 
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        // get todos
        case GET_DEVELOPMENT:
            return { ...state, developmentDetail: null };

        // get todos success
        case GET_DEVELOPMENT_SUCCESS:
            return { ...state, developmentDetail: action.payload };

        // get todos failure
        case GET_DEVELOPMENT_FAILURE:
            return { ...state, developmentDetail: null };

        // get todos
        case GET_ALL_DEVELOPMENT:
            return { ...state, alldevelopmentDetail: null };

        // get todos success
        case GET_ALL_DEVELOPMENT_SUCCESS:
            return { ...state, alldevelopmentDetail: action.payload };

        // get todos failure
        case GET_ALL_DEVELOPMENT_FAILURE:
            return { ...state, alldevelopmentDetail: null };

        case SELECT_DEVELOPMENT_OPTION:
            return { ...state, parentSelect: action.payload.parentSelect, childSelect: action.payload.childSelect };

        case GET_DEVELOPMENT_UNIT:
            return { ...state, developmentUnitDetail: null };

        case GET_DEVELOPMENT_UNIT_FAILURE:
            return { ...state };

        case GET_DEVELOPMENT_UNIT_SUCCESS:
            return { ...state, developmentUnitDetail: action.payload.unitResult, developmentDetail: action.payload.development };

        case SET_STATUS:
            return { ...state, successStatus: false };

        case SET_STATUS_FAILURE:
            return { ...state, successStatus: false };

        case SET_STATUS_SUCCESS:
            return { ...state, successStatus: true };

        // get search
        case AVAILABLE_SEARCH_UNIT:
            return { ...state, availablesearchUnits: null };

        // get search success
        case AVAILABLE_SEARCH_UNIT_SUCCESS:
            return { ...state, availablesearchUnits: action.payload };

        // get search failure
        case AVAILABLE_SEARCH_UNIT_FAILURE:
            return { ...state, availablesearchUnits: null }

        default: return { ...state };
    }
}
